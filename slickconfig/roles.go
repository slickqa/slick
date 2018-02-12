package slickconfig

const (
	PERMISSION_ADMIN uint32 = 1 << iota
	PERMISSION_BUILD_WRITE
	PERMISSION_BUILD_DELETE
	PERMISSION_TESTCASE_WRITE
	PERMISSION_TESTCASE_DELETE
	PERMISSION_TESTPLAN_WRITE
	PERMISSION_TESTPLAN_DELETE
	PERMISSION_TESTRUN_WRITE
	PERMISSION_TESTRUN_DELETE
	PERMISSION_RESULT_WRITE
	PERMISSION_RESULT_DELETE
	PERMISSION_REPORT_GENERATE
)

type Role struct {
	Name string `toml:"name"`
	Description string `toml:"description"`
	Permission int32 `toml:"permission"`
}

var (
	DefaultRoles = []Role {
		Role {
			Name: "Project Admin",
			Description: "An admin of a project has complete control over it.",
			Permission: PERMISSION_ADMIN,
		},
		Role {
			Name: "Tester",
			Description: "An admin of a project has complete control over it.",
			Permission: PERMISSION_RESULT_WRITE | PERMISSION_TESTCASE_WRITE,
		},
		Role {
			Name: "Test Manager",
			Description: "Someone who can organize and kick off tests, and fix other's mistakes (delete tests, and testplans)",
			Permission: PERMISSION_BUILD_WRITE | PERMISSION_RESULT_WRITE | PERMISSION_TESTCASE_WRITE | PERMISSION_TESTCASE_DELETE | PERMISSION_TESTPLAN_WRITE | PERMISSION_TESTPLAN_DELETE | PERMISSION_TESTRUN_WRITE,
		},
		Role {
			Name: "Report Generator",
			Description: "Can generate the read only reports for others to view.",
			Permission: PERMISSION_REPORT_GENERATE,
		},
		Role {
			Name: "Result Deleter",
			Description: "Can delete results, testruns, and builds (dangerous)",
			Permission: PERMISSION_RESULT_DELETE | PERMISSION_TESTRUN_DELETE | PERMISSION_BUILD_DELETE,
		},
		Role {
			Name: "Build Engineer",
			Description: "Can create new builds",
			Permission: PERMISSION_BUILD_WRITE,
		},
	}

)

func GetPermissionName(permission uint32) string {
	if (permission & PERMISSION_ADMIN) != 0 {
		return "Administrator"
	}
	if (permission & PERMISSION_BUILD_WRITE) != 0 {
		return "Build Write"
	}
	return "Unknown"
}
