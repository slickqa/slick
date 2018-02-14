package slickconfig

import "strings"

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
	Permission uint32 `toml:"permission"`
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
	if permission == PERMISSION_ADMIN {
		return "Administrator"
	}
	if permission == PERMISSION_BUILD_WRITE {
		return "Write to Build"
	}
	if permission == PERMISSION_BUILD_DELETE {
		return "Delete Build"
	}
	if permission == PERMISSION_TESTCASE_WRITE {
		return "Write to Testcase"
	}
	if permission == PERMISSION_TESTCASE_DELETE {
		return "Delete Testcase"
	}
	if permission == PERMISSION_TESTPLAN_WRITE {
		return "Write to Testplan"
	}
	if permission == PERMISSION_TESTPLAN_DELETE {
		return "Delete Testplan"
	}
	if permission == PERMISSION_TESTRUN_WRITE {
		return "Write to Testrun"
	}
	if permission == PERMISSION_TESTRUN_DELETE {
		return "Delete Testrun"
	}
	if permission == PERMISSION_RESULT_WRITE {
		return "Write to Result"
	}
	if permission == PERMISSION_RESULT_DELETE {
		return "Delete Result"
	}
	if permission == PERMISSION_REPORT_GENERATE {
		return "Generate Report"
	}
	return "Unknown"
}

func GetPermissionNames(permission uint32) (retval []string) {
	if (permission & PERMISSION_ADMIN) != 0 {
		retval = append(retval, "Administrator")
	}
	if (permission & PERMISSION_BUILD_WRITE) != 0 {
		retval = append(retval, "Write to Build")
	}
	if (permission & PERMISSION_BUILD_DELETE) != 0 {
		retval = append(retval, "Delete Build")
	}
	if (permission & PERMISSION_TESTCASE_WRITE) != 0 {
		retval = append(retval, "Write to Testcase")
	}
	if (permission & PERMISSION_TESTCASE_DELETE) != 0 {
		retval = append(retval, "Delete Testcase")
	}
	if (permission & PERMISSION_TESTPLAN_WRITE) != 0 {
		retval = append(retval, "Write to Testplan")
	}
	if (permission & PERMISSION_TESTPLAN_DELETE) != 0 {
		retval = append(retval, "Delete Testplan")
	}
	if (permission & PERMISSION_TESTRUN_WRITE) != 0 {
		retval = append(retval, "Write to Testrun")
	}
	if (permission & PERMISSION_TESTRUN_DELETE) != 0 {
		retval = append(retval, "Delete Testrun")
	}
	if (permission & PERMISSION_RESULT_WRITE) != 0 {
		retval = append(retval, "Write to Result")
	}
	if (permission & PERMISSION_RESULT_DELETE) != 0 {
		retval = append(retval, "Delete Result")
	}
	if (permission & PERMISSION_REPORT_GENERATE) != 0 {
		retval = append(retval, "Generate Report")
	}
	return retval
}

func DescribePermission(permission uint32) string {
	permissions := GetPermissionNames(permission)
	if len(permissions) > 1 {
		return "Permissions " + strings.Join(permissions, ", ")
	} else if len(permissions) == 1 {
		return "Permission " + permissions[0]
	} else {
		return "Unknown Permission(s)"
	}
}
