package services

import (
	"github.com/dghubble/gologin"
	"net/http"
	googleOAuth2 "golang.org/x/oauth2/google"
	"github.com/dghubble/gologin/google"
	"golang.org/x/oauth2"
	"fmt"
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/jwtauth"
	googleUser "google.golang.org/api/oauth2/v2"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/db"
	"encoding/json"
	"github.com/rs/zerolog/log"
)

func GoogleLoginHandlers(mux *http.ServeMux) {
	oauth2Config := &oauth2.Config{
		ClientID:     slickconfig.Configuration.Google.ClientID,
		ClientSecret: slickconfig.Configuration.Google.Secret,
		RedirectURL:  fmt.Sprintf("%s/login/google-callback", slickconfig.Configuration.Common.BaseUrl),
		Endpoint:     googleOAuth2.Endpoint,
		Scopes:       []string{"profile", "email"},
	}
	// state param cookies require HTTPS by default; disable for localhost development
	stateConfig := gologin.DebugOnlyCookieConfig
	mux.Handle("/login/google", google.StateHandler(stateConfig, google.LoginHandler(oauth2Config, nil)))
	mux.Handle("/login/google-callback", google.StateHandler(stateConfig, google.CallbackHandler(oauth2Config, issueLoginSession(), nil)))
}

func defaultAccessConfiguration() (*slickqa.SlickPermissionInfo) {
	retval := slickqa.SlickPermissionInfo{}
	if slickconfig.Configuration.DefaultAccess.Company != "" && len(slickconfig.Configuration.DefaultAccess.Projects) > 0 {
		companyPerms := slickqa.CompanyPermissionInfo{CompanyName: slickconfig.Configuration.DefaultAccess.Company}
		companyPerms.Projects = make([]*slickqa.ProjectPermissionInfo, len(slickconfig.Configuration.DefaultAccess.Projects))
		for i, projectName := range slickconfig.Configuration.DefaultAccess.Projects {
			companyPerms.Projects[i] = &slickqa.ProjectPermissionInfo{
				ProjectName: projectName,
				Roles: []string {"Read Only"},
			}
		}
		retval.Companies = []*slickqa.CompanyPermissionInfo { &companyPerms }
	}
	return &retval
}

// get preferences from company, if there are none, get default preferences

func defaultPreferences() *slickqa.Preferences {
	return &slickqa.Preferences{
		Theme: "Red",
		HomeUrl: "/user/settings",
	}
}

func defaultPreferencesForUser(user *slickqa.UserInfo) *slickqa.Preferences {
	logger := log.With().Str("loggerName", "services.googleLogin.defaultPreferencesForUser").Logger()
	logger.Debug().Str("email", user.EmailAddress).Msg("Creating default preferences for user.")
	if user.Permissions != nil && len(user.Permissions.Companies) > 0 {
		logger.Debug().Str("email", user.EmailAddress).Int("CompaniesLength", len(user.Permissions.Companies)).Msg("Found companies in permissions")
		for _, company := range user.Permissions.Companies {
			logger.Debug().Str("company", company.CompanyName).Msg("Checking for settings")
			settings, err := db.CompanySettings.Find(company.CompanyName)
			if err == nil {
				logger.Debug().Str("company", company.CompanyName).Str("email", user.EmailAddress).Msg("User has permissions to company")
				if settings.UserPreferenceTemplate != nil {
					logger.Debug().Str("company", company.CompanyName).Msgf("Found preferences, using %+v", settings.UserPreferenceTemplate)
					return settings.UserPreferenceTemplate
				}
			}
		}
	}
	return defaultPreferences()
}

func slickUserFromGoogleUser(user *googleUser.Userinfoplus) *slickqa.UserInfo {
	return &slickqa.UserInfo{
		EmailAddress: user.Email,
		FullName: user.Name,
		GivenName: user.GivenName,
		FamilyName: user.FamilyName,
		AvatarUrl: user.Picture,
		Permissions: defaultAccessConfiguration(),
	}
}

func issueLoginSession() http.Handler {
	logger := log.With().Str("loggerName", "services.googleLogin.issueLoginSession").Logger()
	fn := func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		googleUser, err := google.UserFromContext(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		user, err := db.User.Find(googleUser.Email)
		if err != nil {
			user = slickUserFromGoogleUser(googleUser)
			if user.EmailAddress == slickconfig.Configuration.DefaultAccess.Admin {
				user.Permissions.SlickAdmin = 1
			}
			user.UserPreferences = defaultPreferencesForUser(user)
			err = db.User.AddUser(user)
			if err != nil {
				logger.Error().AnErr("error", err).Str("user", user.EmailAddress).Msg("Cannot store in database user, login can continue, but many things may not work.")
			}
		} else {
			if user.EmailAddress == slickconfig.Configuration.DefaultAccess.Admin {
				user.Permissions.SlickAdmin = 1
				db.User.UpdateUser(user)
			}
		}
		if user.UserPreferences == nil {
			user.UserPreferences = defaultPreferencesForUser(user)
			db.User.UpdateUser(user)
		}

		// 2. Implement a success handler to issue some form of session
		token, err := jwtauth.CreateJWTForUser(*user)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		userJson, err :=  json.Marshal(*user)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		logger.Debug().Str("user", user.EmailAddress).Msg("Successful Login")
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write([]byte(fmt.Sprintf(`
<html>
	<head>
		<title>Slick Authentication Callback</title>
		<script lang="javascript">
			localStorage.token="%s";
            localStorage.user='%s';
			window.location.replace("%s");
		</script>
	</head>
	<body>
	</body>
</html>
`, token, string(userJson),
	slickconfig.Configuration.Common.BaseUrl)))
	}
	return http.HandlerFunc(fn)
}
