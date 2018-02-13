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
	"github.com/serussell/logxi/v1"
)

func GoogleLoginHandlers(mux *http.ServeMux) {
	oauth2Config := &oauth2.Config{
		ClientID:     "",
		ClientSecret: "",
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
				Permissions: 0,
			}
		}
		retval.Companies = []*slickqa.CompanyPermissionInfo { &companyPerms }
	}
	return &retval
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
	logger := log.New("services.googleLogin.issueLoginSession")
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
			err = db.User.AddUser(user)
			if err != nil {
				logger.Error("Cannot store in database user, login can continue, but many things may not work.", "user", user, "error", err)
			}
		}
		// 2. Implement a success handler to issue some form of session
		token, err := jwtauth.CreateJWTForUser(*user)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write([]byte(fmt.Sprintf(`
<html>
	<head>
		<title>Slick Authentication Callback</title>
		<script lang="javascript">
			localStorage.token="%s";
			localStorage.userName="%s";
			localStorage.userFirstName="%s";
			localStorage.userFamilyName="%s";
			localStorage.userGender="%s";
			localStorage.userPicture="%s";
			window.location.replace("%s");
		</script>
	</head>
	<body>
	</body>
</html>
`, token, googleUser.Name, googleUser.GivenName, googleUser.FamilyName, googleUser.Gender, googleUser.Picture,
	slickconfig.Configuration.Common.BaseUrl)))
	}
	return http.HandlerFunc(fn)
}
