// Code generated by protoc-gen-go.
// source: slick.proto
// DO NOT EDIT!

/*
Package slickqa is a generated protocol buffer package.

It is generated from these files:
	slick.proto

It has these top-level messages:
	IsAuthorizedRequest
	IsAuthorizedResponse
	UserInfoRequest
	UsersForCompanyQueryRequest
	UsersForProjectQueryRequest
	UsersQueryResponse
	ProjectPermissionInfo
	CompanyPermissionInfo
	SlickPermissionInfo
	UserInfo
	ApiTokenLoginRequest
	PlainUserLoginRequest
	LoginResponse
	Project
	Component
	Feature
	Testcase
	Testplans
	Testruns
*/
package slickqa

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import google_protobuf "github.com/golang/protobuf/ptypes/timestamp"
import _ "google.golang.org/genproto/googleapis/api/annotations"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

// auth stuff
type IsAuthorizedRequest struct {
	CompanyName string `protobuf:"bytes,1,opt,name=CompanyName" json:"CompanyName,omitempty"`
	ProjectName string `protobuf:"bytes,2,opt,name=ProjectName" json:"ProjectName,omitempty"`
	Permission  uint32 `protobuf:"varint,3,opt,name=Permission" json:"Permission,omitempty"`
}

func (m *IsAuthorizedRequest) Reset()                    { *m = IsAuthorizedRequest{} }
func (m *IsAuthorizedRequest) String() string            { return proto.CompactTextString(m) }
func (*IsAuthorizedRequest) ProtoMessage()               {}
func (*IsAuthorizedRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *IsAuthorizedRequest) GetCompanyName() string {
	if m != nil {
		return m.CompanyName
	}
	return ""
}

func (m *IsAuthorizedRequest) GetProjectName() string {
	if m != nil {
		return m.ProjectName
	}
	return ""
}

func (m *IsAuthorizedRequest) GetPermission() uint32 {
	if m != nil {
		return m.Permission
	}
	return 0
}

type IsAuthorizedResponse struct {
	Allowed bool   `protobuf:"varint,1,opt,name=Allowed" json:"Allowed,omitempty"`
	Message string `protobuf:"bytes,2,opt,name=Message" json:"Message,omitempty"`
}

func (m *IsAuthorizedResponse) Reset()                    { *m = IsAuthorizedResponse{} }
func (m *IsAuthorizedResponse) String() string            { return proto.CompactTextString(m) }
func (*IsAuthorizedResponse) ProtoMessage()               {}
func (*IsAuthorizedResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *IsAuthorizedResponse) GetAllowed() bool {
	if m != nil {
		return m.Allowed
	}
	return false
}

func (m *IsAuthorizedResponse) GetMessage() string {
	if m != nil {
		return m.Message
	}
	return ""
}

type UserInfoRequest struct {
	EmailAddress string `protobuf:"bytes,1,opt,name=EmailAddress" json:"EmailAddress,omitempty"`
}

func (m *UserInfoRequest) Reset()                    { *m = UserInfoRequest{} }
func (m *UserInfoRequest) String() string            { return proto.CompactTextString(m) }
func (*UserInfoRequest) ProtoMessage()               {}
func (*UserInfoRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *UserInfoRequest) GetEmailAddress() string {
	if m != nil {
		return m.EmailAddress
	}
	return ""
}

type UsersForCompanyQueryRequest struct {
	CompanyName string `protobuf:"bytes,1,opt,name=CompanyName" json:"CompanyName,omitempty"`
}

func (m *UsersForCompanyQueryRequest) Reset()                    { *m = UsersForCompanyQueryRequest{} }
func (m *UsersForCompanyQueryRequest) String() string            { return proto.CompactTextString(m) }
func (*UsersForCompanyQueryRequest) ProtoMessage()               {}
func (*UsersForCompanyQueryRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{3} }

func (m *UsersForCompanyQueryRequest) GetCompanyName() string {
	if m != nil {
		return m.CompanyName
	}
	return ""
}

type UsersForProjectQueryRequest struct {
	CompanyName string `protobuf:"bytes,1,opt,name=CompanyName" json:"CompanyName,omitempty"`
	ProjectName string `protobuf:"bytes,2,opt,name=ProjectName" json:"ProjectName,omitempty"`
}

func (m *UsersForProjectQueryRequest) Reset()                    { *m = UsersForProjectQueryRequest{} }
func (m *UsersForProjectQueryRequest) String() string            { return proto.CompactTextString(m) }
func (*UsersForProjectQueryRequest) ProtoMessage()               {}
func (*UsersForProjectQueryRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{4} }

func (m *UsersForProjectQueryRequest) GetCompanyName() string {
	if m != nil {
		return m.CompanyName
	}
	return ""
}

func (m *UsersForProjectQueryRequest) GetProjectName() string {
	if m != nil {
		return m.ProjectName
	}
	return ""
}

type UsersQueryResponse struct {
	Users []*UserInfo `protobuf:"bytes,1,rep,name=users" json:"users,omitempty"`
}

func (m *UsersQueryResponse) Reset()                    { *m = UsersQueryResponse{} }
func (m *UsersQueryResponse) String() string            { return proto.CompactTextString(m) }
func (*UsersQueryResponse) ProtoMessage()               {}
func (*UsersQueryResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{5} }

func (m *UsersQueryResponse) GetUsers() []*UserInfo {
	if m != nil {
		return m.Users
	}
	return nil
}

type ProjectPermissionInfo struct {
	ProjectName string `protobuf:"bytes,1,opt,name=ProjectName" json:"ProjectName,omitempty"`
	Permissions uint32 `protobuf:"varint,2,opt,name=Permissions" json:"Permissions,omitempty"`
}

func (m *ProjectPermissionInfo) Reset()                    { *m = ProjectPermissionInfo{} }
func (m *ProjectPermissionInfo) String() string            { return proto.CompactTextString(m) }
func (*ProjectPermissionInfo) ProtoMessage()               {}
func (*ProjectPermissionInfo) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{6} }

func (m *ProjectPermissionInfo) GetProjectName() string {
	if m != nil {
		return m.ProjectName
	}
	return ""
}

func (m *ProjectPermissionInfo) GetPermissions() uint32 {
	if m != nil {
		return m.Permissions
	}
	return 0
}

type CompanyPermissionInfo struct {
	CompanyName  string                   `protobuf:"bytes,1,opt,name=CompanyName" json:"CompanyName,omitempty"`
	CompanyAdmin uint32                   `protobuf:"varint,2,opt,name=CompanyAdmin" json:"CompanyAdmin,omitempty"`
	Projects     []*ProjectPermissionInfo `protobuf:"bytes,3,rep,name=Projects" json:"Projects,omitempty"`
}

func (m *CompanyPermissionInfo) Reset()                    { *m = CompanyPermissionInfo{} }
func (m *CompanyPermissionInfo) String() string            { return proto.CompactTextString(m) }
func (*CompanyPermissionInfo) ProtoMessage()               {}
func (*CompanyPermissionInfo) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{7} }

func (m *CompanyPermissionInfo) GetCompanyName() string {
	if m != nil {
		return m.CompanyName
	}
	return ""
}

func (m *CompanyPermissionInfo) GetCompanyAdmin() uint32 {
	if m != nil {
		return m.CompanyAdmin
	}
	return 0
}

func (m *CompanyPermissionInfo) GetProjects() []*ProjectPermissionInfo {
	if m != nil {
		return m.Projects
	}
	return nil
}

type SlickPermissionInfo struct {
	SlickAdmin uint32                   `protobuf:"varint,1,opt,name=SlickAdmin" json:"SlickAdmin,omitempty"`
	Companies  []*CompanyPermissionInfo `protobuf:"bytes,2,rep,name=Companies" json:"Companies,omitempty"`
}

func (m *SlickPermissionInfo) Reset()                    { *m = SlickPermissionInfo{} }
func (m *SlickPermissionInfo) String() string            { return proto.CompactTextString(m) }
func (*SlickPermissionInfo) ProtoMessage()               {}
func (*SlickPermissionInfo) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{8} }

func (m *SlickPermissionInfo) GetSlickAdmin() uint32 {
	if m != nil {
		return m.SlickAdmin
	}
	return 0
}

func (m *SlickPermissionInfo) GetCompanies() []*CompanyPermissionInfo {
	if m != nil {
		return m.Companies
	}
	return nil
}

type UserInfo struct {
	EmailAddress   string               `protobuf:"bytes,1,opt,name=EmailAddress" json:"EmailAddress,omitempty"`
	Permissions    *SlickPermissionInfo `protobuf:"bytes,2,opt,name=Permissions" json:"Permissions,omitempty"`
	FullName       string               `protobuf:"bytes,3,opt,name=FullName" json:"FullName,omitempty"`
	GivenName      string               `protobuf:"bytes,4,opt,name=GivenName" json:"GivenName,omitempty"`
	FamilyName     string               `protobuf:"bytes,5,opt,name=FamilyName" json:"FamilyName,omitempty"`
	AvatarUrl      string               `protobuf:"bytes,6,opt,name=AvatarUrl" json:"AvatarUrl,omitempty"`
	JobTitle       string               `protobuf:"bytes,7,opt,name=JobTitle" json:"JobTitle,omitempty"`
	HashedPassword string               `protobuf:"bytes,8,opt,name=HashedPassword" json:"HashedPassword,omitempty"`
}

func (m *UserInfo) Reset()                    { *m = UserInfo{} }
func (m *UserInfo) String() string            { return proto.CompactTextString(m) }
func (*UserInfo) ProtoMessage()               {}
func (*UserInfo) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{9} }

func (m *UserInfo) GetEmailAddress() string {
	if m != nil {
		return m.EmailAddress
	}
	return ""
}

func (m *UserInfo) GetPermissions() *SlickPermissionInfo {
	if m != nil {
		return m.Permissions
	}
	return nil
}

func (m *UserInfo) GetFullName() string {
	if m != nil {
		return m.FullName
	}
	return ""
}

func (m *UserInfo) GetGivenName() string {
	if m != nil {
		return m.GivenName
	}
	return ""
}

func (m *UserInfo) GetFamilyName() string {
	if m != nil {
		return m.FamilyName
	}
	return ""
}

func (m *UserInfo) GetAvatarUrl() string {
	if m != nil {
		return m.AvatarUrl
	}
	return ""
}

func (m *UserInfo) GetJobTitle() string {
	if m != nil {
		return m.JobTitle
	}
	return ""
}

func (m *UserInfo) GetHashedPassword() string {
	if m != nil {
		return m.HashedPassword
	}
	return ""
}

type ApiTokenLoginRequest struct {
	Token string `protobuf:"bytes,1,opt,name=Token" json:"Token,omitempty"`
}

func (m *ApiTokenLoginRequest) Reset()                    { *m = ApiTokenLoginRequest{} }
func (m *ApiTokenLoginRequest) String() string            { return proto.CompactTextString(m) }
func (*ApiTokenLoginRequest) ProtoMessage()               {}
func (*ApiTokenLoginRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{10} }

func (m *ApiTokenLoginRequest) GetToken() string {
	if m != nil {
		return m.Token
	}
	return ""
}

type PlainUserLoginRequest struct {
	UserName string `protobuf:"bytes,1,opt,name=UserName" json:"UserName,omitempty"`
	Password string `protobuf:"bytes,2,opt,name=Password" json:"Password,omitempty"`
}

func (m *PlainUserLoginRequest) Reset()                    { *m = PlainUserLoginRequest{} }
func (m *PlainUserLoginRequest) String() string            { return proto.CompactTextString(m) }
func (*PlainUserLoginRequest) ProtoMessage()               {}
func (*PlainUserLoginRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{11} }

func (m *PlainUserLoginRequest) GetUserName() string {
	if m != nil {
		return m.UserName
	}
	return ""
}

func (m *PlainUserLoginRequest) GetPassword() string {
	if m != nil {
		return m.Password
	}
	return ""
}

type LoginResponse struct {
	Success bool      `protobuf:"varint,1,opt,name=Success" json:"Success,omitempty"`
	Token   string    `protobuf:"bytes,2,opt,name=Token" json:"Token,omitempty"`
	User    *UserInfo `protobuf:"bytes,3,opt,name=User" json:"User,omitempty"`
}

func (m *LoginResponse) Reset()                    { *m = LoginResponse{} }
func (m *LoginResponse) String() string            { return proto.CompactTextString(m) }
func (*LoginResponse) ProtoMessage()               {}
func (*LoginResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{12} }

func (m *LoginResponse) GetSuccess() bool {
	if m != nil {
		return m.Success
	}
	return false
}

func (m *LoginResponse) GetToken() string {
	if m != nil {
		return m.Token
	}
	return ""
}

func (m *LoginResponse) GetUser() *UserInfo {
	if m != nil {
		return m.User
	}
	return nil
}

// slick objects
type Project struct {
	Id              []byte                     `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name            string                     `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
	AutomationTools []string                   `protobuf:"bytes,3,rep,name=AutomationTools" json:"AutomationTools,omitempty"`
	Tags            []string                   `protobuf:"bytes,4,rep,name=Tags" json:"Tags,omitempty"`
	Attributes      map[string]string          `protobuf:"bytes,5,rep,name=Attributes" json:"Attributes,omitempty" protobuf_key:"bytes,1,opt,name=key" protobuf_val:"bytes,2,opt,name=value"`
	LastUpdated     *google_protobuf.Timestamp `protobuf:"bytes,6,opt,name=LastUpdated" json:"LastUpdated,omitempty"`
}

func (m *Project) Reset()                    { *m = Project{} }
func (m *Project) String() string            { return proto.CompactTextString(m) }
func (*Project) ProtoMessage()               {}
func (*Project) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{13} }

func (m *Project) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Project) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Project) GetAutomationTools() []string {
	if m != nil {
		return m.AutomationTools
	}
	return nil
}

func (m *Project) GetTags() []string {
	if m != nil {
		return m.Tags
	}
	return nil
}

func (m *Project) GetAttributes() map[string]string {
	if m != nil {
		return m.Attributes
	}
	return nil
}

func (m *Project) GetLastUpdated() *google_protobuf.Timestamp {
	if m != nil {
		return m.LastUpdated
	}
	return nil
}

type Component struct {
	Id      []byte `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name    string `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
	Project string `protobuf:"bytes,3,opt,name=Project" json:"Project,omitempty"`
}

func (m *Component) Reset()                    { *m = Component{} }
func (m *Component) String() string            { return proto.CompactTextString(m) }
func (*Component) ProtoMessage()               {}
func (*Component) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{14} }

func (m *Component) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Component) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Component) GetProject() string {
	if m != nil {
		return m.Project
	}
	return ""
}

type Feature struct {
	Id          []byte `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name        string `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
	ComponentId []byte `protobuf:"bytes,3,opt,name=ComponentId,proto3" json:"ComponentId,omitempty"`
	ProjectId   string `protobuf:"bytes,4,opt,name=ProjectId" json:"ProjectId,omitempty"`
}

func (m *Feature) Reset()                    { *m = Feature{} }
func (m *Feature) String() string            { return proto.CompactTextString(m) }
func (*Feature) ProtoMessage()               {}
func (*Feature) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{15} }

func (m *Feature) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Feature) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Feature) GetComponentId() []byte {
	if m != nil {
		return m.ComponentId
	}
	return nil
}

func (m *Feature) GetProjectId() string {
	if m != nil {
		return m.ProjectId
	}
	return ""
}

type Testcase struct {
	Id               []byte   `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name             string   `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
	AutomationKey    string   `protobuf:"bytes,3,opt,name=AutomationKey" json:"AutomationKey,omitempty"`
	AutomationTool   string   `protobuf:"bytes,4,opt,name=AutomationTool" json:"AutomationTool,omitempty"`
	ComponentId      []byte   `protobuf:"bytes,5,opt,name=ComponentId,proto3" json:"ComponentId,omitempty"`
	Deleted          bool     `protobuf:"varint,6,opt,name=Deleted" json:"Deleted,omitempty"`
	ImportanceRating int32    `protobuf:"varint,7,opt,name=ImportanceRating" json:"ImportanceRating,omitempty"`
	InactiveNotes    []string `protobuf:"bytes,8,rep,name=InactiveNotes" json:"InactiveNotes,omitempty"`
	ProjectId        string   `protobuf:"bytes,9,opt,name=ProjectId" json:"ProjectId,omitempty"`
	StabilityRating  int32    `protobuf:"varint,10,opt,name=StabilityRating" json:"StabilityRating,omitempty"`
	Steps            []string `protobuf:"bytes,11,rep,name=Steps" json:"Steps,omitempty"`
	Tags             []string `protobuf:"bytes,12,rep,name=Tags" json:"Tags,omitempty"`
}

func (m *Testcase) Reset()                    { *m = Testcase{} }
func (m *Testcase) String() string            { return proto.CompactTextString(m) }
func (*Testcase) ProtoMessage()               {}
func (*Testcase) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{16} }

func (m *Testcase) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Testcase) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Testcase) GetAutomationKey() string {
	if m != nil {
		return m.AutomationKey
	}
	return ""
}

func (m *Testcase) GetAutomationTool() string {
	if m != nil {
		return m.AutomationTool
	}
	return ""
}

func (m *Testcase) GetComponentId() []byte {
	if m != nil {
		return m.ComponentId
	}
	return nil
}

func (m *Testcase) GetDeleted() bool {
	if m != nil {
		return m.Deleted
	}
	return false
}

func (m *Testcase) GetImportanceRating() int32 {
	if m != nil {
		return m.ImportanceRating
	}
	return 0
}

func (m *Testcase) GetInactiveNotes() []string {
	if m != nil {
		return m.InactiveNotes
	}
	return nil
}

func (m *Testcase) GetProjectId() string {
	if m != nil {
		return m.ProjectId
	}
	return ""
}

func (m *Testcase) GetStabilityRating() int32 {
	if m != nil {
		return m.StabilityRating
	}
	return 0
}

func (m *Testcase) GetSteps() []string {
	if m != nil {
		return m.Steps
	}
	return nil
}

func (m *Testcase) GetTags() []string {
	if m != nil {
		return m.Tags
	}
	return nil
}

type Testplans struct {
	Id   []byte `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name string `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
}

func (m *Testplans) Reset()                    { *m = Testplans{} }
func (m *Testplans) String() string            { return proto.CompactTextString(m) }
func (*Testplans) ProtoMessage()               {}
func (*Testplans) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{17} }

func (m *Testplans) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Testplans) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

type Testruns struct {
	Id          []byte                     `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name        string                     `protobuf:"bytes,2,opt,name=Name" json:"Name,omitempty"`
	ProjectId   string                     `protobuf:"bytes,3,opt,name=ProjectId" json:"ProjectId,omitempty"`
	Build       string                     `protobuf:"bytes,4,opt,name=Build" json:"Build,omitempty"`
	RunStarted  *google_protobuf.Timestamp `protobuf:"bytes,5,opt,name=RunStarted" json:"RunStarted,omitempty"`
	RunFinished *google_protobuf.Timestamp `protobuf:"bytes,6,opt,name=RunFinished" json:"RunFinished,omitempty"`
	State       string                     `protobuf:"bytes,7,opt,name=State" json:"State,omitempty"`
	TestplanId  string                     `protobuf:"bytes,8,opt,name=TestplanId" json:"TestplanId,omitempty"`
}

func (m *Testruns) Reset()                    { *m = Testruns{} }
func (m *Testruns) String() string            { return proto.CompactTextString(m) }
func (*Testruns) ProtoMessage()               {}
func (*Testruns) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{18} }

func (m *Testruns) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *Testruns) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Testruns) GetProjectId() string {
	if m != nil {
		return m.ProjectId
	}
	return ""
}

func (m *Testruns) GetBuild() string {
	if m != nil {
		return m.Build
	}
	return ""
}

func (m *Testruns) GetRunStarted() *google_protobuf.Timestamp {
	if m != nil {
		return m.RunStarted
	}
	return nil
}

func (m *Testruns) GetRunFinished() *google_protobuf.Timestamp {
	if m != nil {
		return m.RunFinished
	}
	return nil
}

func (m *Testruns) GetState() string {
	if m != nil {
		return m.State
	}
	return ""
}

func (m *Testruns) GetTestplanId() string {
	if m != nil {
		return m.TestplanId
	}
	return ""
}

func init() {
	proto.RegisterType((*IsAuthorizedRequest)(nil), "slickqa.IsAuthorizedRequest")
	proto.RegisterType((*IsAuthorizedResponse)(nil), "slickqa.IsAuthorizedResponse")
	proto.RegisterType((*UserInfoRequest)(nil), "slickqa.UserInfoRequest")
	proto.RegisterType((*UsersForCompanyQueryRequest)(nil), "slickqa.UsersForCompanyQueryRequest")
	proto.RegisterType((*UsersForProjectQueryRequest)(nil), "slickqa.UsersForProjectQueryRequest")
	proto.RegisterType((*UsersQueryResponse)(nil), "slickqa.UsersQueryResponse")
	proto.RegisterType((*ProjectPermissionInfo)(nil), "slickqa.ProjectPermissionInfo")
	proto.RegisterType((*CompanyPermissionInfo)(nil), "slickqa.CompanyPermissionInfo")
	proto.RegisterType((*SlickPermissionInfo)(nil), "slickqa.SlickPermissionInfo")
	proto.RegisterType((*UserInfo)(nil), "slickqa.UserInfo")
	proto.RegisterType((*ApiTokenLoginRequest)(nil), "slickqa.ApiTokenLoginRequest")
	proto.RegisterType((*PlainUserLoginRequest)(nil), "slickqa.PlainUserLoginRequest")
	proto.RegisterType((*LoginResponse)(nil), "slickqa.LoginResponse")
	proto.RegisterType((*Project)(nil), "slickqa.Project")
	proto.RegisterType((*Component)(nil), "slickqa.Component")
	proto.RegisterType((*Feature)(nil), "slickqa.Feature")
	proto.RegisterType((*Testcase)(nil), "slickqa.Testcase")
	proto.RegisterType((*Testplans)(nil), "slickqa.Testplans")
	proto.RegisterType((*Testruns)(nil), "slickqa.Testruns")
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for Auth service

type AuthClient interface {
	IsAuthorized(ctx context.Context, in *IsAuthorizedRequest, opts ...grpc.CallOption) (*IsAuthorizedResponse, error)
	LoginWithToken(ctx context.Context, in *ApiTokenLoginRequest, opts ...grpc.CallOption) (*LoginResponse, error)
	LoginWithCredentials(ctx context.Context, in *PlainUserLoginRequest, opts ...grpc.CallOption) (*LoginResponse, error)
}

type authClient struct {
	cc *grpc.ClientConn
}

func NewAuthClient(cc *grpc.ClientConn) AuthClient {
	return &authClient{cc}
}

func (c *authClient) IsAuthorized(ctx context.Context, in *IsAuthorizedRequest, opts ...grpc.CallOption) (*IsAuthorizedResponse, error) {
	out := new(IsAuthorizedResponse)
	err := grpc.Invoke(ctx, "/slickqa.Auth/IsAuthorized", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authClient) LoginWithToken(ctx context.Context, in *ApiTokenLoginRequest, opts ...grpc.CallOption) (*LoginResponse, error) {
	out := new(LoginResponse)
	err := grpc.Invoke(ctx, "/slickqa.Auth/LoginWithToken", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *authClient) LoginWithCredentials(ctx context.Context, in *PlainUserLoginRequest, opts ...grpc.CallOption) (*LoginResponse, error) {
	out := new(LoginResponse)
	err := grpc.Invoke(ctx, "/slickqa.Auth/LoginWithCredentials", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for Auth service

type AuthServer interface {
	IsAuthorized(context.Context, *IsAuthorizedRequest) (*IsAuthorizedResponse, error)
	LoginWithToken(context.Context, *ApiTokenLoginRequest) (*LoginResponse, error)
	LoginWithCredentials(context.Context, *PlainUserLoginRequest) (*LoginResponse, error)
}

func RegisterAuthServer(s *grpc.Server, srv AuthServer) {
	s.RegisterService(&_Auth_serviceDesc, srv)
}

func _Auth_IsAuthorized_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(IsAuthorizedRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthServer).IsAuthorized(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Auth/IsAuthorized",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthServer).IsAuthorized(ctx, req.(*IsAuthorizedRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Auth_LoginWithToken_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ApiTokenLoginRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthServer).LoginWithToken(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Auth/LoginWithToken",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthServer).LoginWithToken(ctx, req.(*ApiTokenLoginRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Auth_LoginWithCredentials_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PlainUserLoginRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AuthServer).LoginWithCredentials(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Auth/LoginWithCredentials",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AuthServer).LoginWithCredentials(ctx, req.(*PlainUserLoginRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Auth_serviceDesc = grpc.ServiceDesc{
	ServiceName: "slickqa.Auth",
	HandlerType: (*AuthServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "IsAuthorized",
			Handler:    _Auth_IsAuthorized_Handler,
		},
		{
			MethodName: "LoginWithToken",
			Handler:    _Auth_LoginWithToken_Handler,
		},
		{
			MethodName: "LoginWithCredentials",
			Handler:    _Auth_LoginWithCredentials_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "slick.proto",
}

// Client API for Users service

type UsersClient interface {
	GetUserInfo(ctx context.Context, in *UserInfoRequest, opts ...grpc.CallOption) (*UserInfo, error)
	GetUsersForCompany(ctx context.Context, in *UsersForCompanyQueryRequest, opts ...grpc.CallOption) (*UsersQueryResponse, error)
	GetUsersForProject(ctx context.Context, in *UsersForProjectQueryRequest, opts ...grpc.CallOption) (*UsersQueryResponse, error)
}

type usersClient struct {
	cc *grpc.ClientConn
}

func NewUsersClient(cc *grpc.ClientConn) UsersClient {
	return &usersClient{cc}
}

func (c *usersClient) GetUserInfo(ctx context.Context, in *UserInfoRequest, opts ...grpc.CallOption) (*UserInfo, error) {
	out := new(UserInfo)
	err := grpc.Invoke(ctx, "/slickqa.Users/GetUserInfo", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) GetUsersForCompany(ctx context.Context, in *UsersForCompanyQueryRequest, opts ...grpc.CallOption) (*UsersQueryResponse, error) {
	out := new(UsersQueryResponse)
	err := grpc.Invoke(ctx, "/slickqa.Users/GetUsersForCompany", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) GetUsersForProject(ctx context.Context, in *UsersForProjectQueryRequest, opts ...grpc.CallOption) (*UsersQueryResponse, error) {
	out := new(UsersQueryResponse)
	err := grpc.Invoke(ctx, "/slickqa.Users/GetUsersForProject", in, out, c.cc, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for Users service

type UsersServer interface {
	GetUserInfo(context.Context, *UserInfoRequest) (*UserInfo, error)
	GetUsersForCompany(context.Context, *UsersForCompanyQueryRequest) (*UsersQueryResponse, error)
	GetUsersForProject(context.Context, *UsersForProjectQueryRequest) (*UsersQueryResponse, error)
}

func RegisterUsersServer(s *grpc.Server, srv UsersServer) {
	s.RegisterService(&_Users_serviceDesc, srv)
}

func _Users_GetUserInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UserInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetUserInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Users/GetUserInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetUserInfo(ctx, req.(*UserInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_GetUsersForCompany_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UsersForCompanyQueryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetUsersForCompany(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Users/GetUsersForCompany",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetUsersForCompany(ctx, req.(*UsersForCompanyQueryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_GetUsersForProject_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UsersForProjectQueryRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetUsersForProject(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/slickqa.Users/GetUsersForProject",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetUsersForProject(ctx, req.(*UsersForProjectQueryRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Users_serviceDesc = grpc.ServiceDesc{
	ServiceName: "slickqa.Users",
	HandlerType: (*UsersServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetUserInfo",
			Handler:    _Users_GetUserInfo_Handler,
		},
		{
			MethodName: "GetUsersForCompany",
			Handler:    _Users_GetUsersForCompany_Handler,
		},
		{
			MethodName: "GetUsersForProject",
			Handler:    _Users_GetUsersForProject_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "slick.proto",
}

func init() { proto.RegisterFile("slick.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 1267 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x57, 0x5f, 0x6f, 0x1b, 0x45,
	0x10, 0x97, 0xed, 0xb8, 0x71, 0xc6, 0x49, 0xd3, 0x6e, 0x53, 0x38, 0xb9, 0x25, 0x44, 0x4b, 0x5b,
	0xa2, 0x42, 0x6d, 0x91, 0x0a, 0x09, 0xaa, 0x96, 0xe2, 0xfe, 0x49, 0x71, 0x29, 0x25, 0x5c, 0x5c,
	0x21, 0xc1, 0xd3, 0xda, 0xb7, 0x71, 0x96, 0x9e, 0x77, 0xdd, 0xdb, 0xbd, 0x54, 0x26, 0xca, 0x0b,
	0x42, 0xe2, 0xbd, 0xf0, 0xc2, 0x57, 0xe8, 0xd7, 0xe1, 0x2b, 0xf0, 0x2d, 0xe0, 0x01, 0xed, 0x9f,
	0xfb, 0x6b, 0xb7, 0x31, 0x6f, 0x37, 0xbf, 0x9d, 0x9d, 0xdf, 0xcc, 0xec, 0xcc, 0xee, 0x1c, 0x34,
	0x65, 0xc8, 0x86, 0xcf, 0xdb, 0x93, 0x48, 0x28, 0x81, 0x96, 0x8d, 0xf0, 0x82, 0xb4, 0xde, 0x1f,
	0x09, 0x31, 0x0a, 0x69, 0xc7, 0xc0, 0x83, 0xf8, 0xa0, 0xa3, 0xd8, 0x98, 0x4a, 0x45, 0xc6, 0x13,
	0xab, 0xd9, 0xba, 0xec, 0x14, 0xc8, 0x84, 0x75, 0x08, 0xe7, 0x42, 0x11, 0xc5, 0x04, 0x97, 0x76,
	0x15, 0x4f, 0xe1, 0x42, 0x4f, 0x76, 0x63, 0x75, 0x28, 0x22, 0xf6, 0x33, 0x0d, 0x7c, 0xfa, 0x22,
	0xa6, 0x52, 0xa1, 0x2d, 0x68, 0xde, 0x17, 0xe3, 0x09, 0xe1, 0xd3, 0xa7, 0x64, 0x4c, 0xbd, 0xca,
	0x56, 0x65, 0x7b, 0xc5, 0xcf, 0x43, 0x5a, 0x63, 0x2f, 0x12, 0x3f, 0xd1, 0xa1, 0x32, 0x1a, 0x55,
	0xab, 0x91, 0x83, 0xd0, 0x26, 0xc0, 0x1e, 0x8d, 0xc6, 0x4c, 0x4a, 0x26, 0xb8, 0x57, 0xdb, 0xaa,
	0x6c, 0xaf, 0xf9, 0x39, 0x04, 0x3f, 0x86, 0x8d, 0x22, 0xb5, 0x9c, 0x08, 0x2e, 0x29, 0xf2, 0x60,
	0xb9, 0x1b, 0x86, 0xe2, 0x25, 0x0d, 0x0c, 0x6f, 0xc3, 0x4f, 0x44, 0xbd, 0xf2, 0x0d, 0x95, 0x92,
	0x8c, 0x12, 0xbe, 0x44, 0xc4, 0x9f, 0xc2, 0xfa, 0x33, 0x49, 0xa3, 0x1e, 0x3f, 0x10, 0x49, 0x08,
	0x18, 0x56, 0x1f, 0x8e, 0x09, 0x0b, 0xbb, 0x41, 0x10, 0x51, 0x29, 0x5d, 0x0c, 0x05, 0x0c, 0xdf,
	0x85, 0x4b, 0x7a, 0x9b, 0xdc, 0x15, 0x91, 0x8b, 0xed, 0xbb, 0x98, 0x46, 0xd3, 0x85, 0xb3, 0x80,
	0x49, 0x66, 0xc0, 0x85, 0xfe, 0xff, 0x0c, 0x9c, 0x9e, 0x46, 0x7c, 0x07, 0x90, 0xa1, 0x70, 0x86,
	0x5d, 0x92, 0x3e, 0x84, 0x7a, 0xac, 0x51, 0xaf, 0xb2, 0x55, 0xdb, 0x6e, 0xee, 0x9c, 0x6f, 0xbb,
	0x7a, 0x68, 0xa7, 0x69, 0xb0, 0xeb, 0xf8, 0x47, 0xb8, 0xe8, 0xac, 0x65, 0xa9, 0xd7, 0xeb, 0x65,
	0xe6, 0xca, 0xec, 0x01, 0x6a, 0x8d, 0x74, 0x8f, 0x34, 0xbe, 0xad, 0xf9, 0x79, 0x08, 0xff, 0x59,
	0x81, 0x8b, 0x2e, 0x9a, 0x59, 0xeb, 0xa7, 0x44, 0x8e, 0x61, 0xd5, 0x89, 0xdd, 0x60, 0xcc, 0xb8,
	0x33, 0x5f, 0xc0, 0xd0, 0x2d, 0x68, 0x38, 0x87, 0xa4, 0x57, 0x33, 0x81, 0x6e, 0xa6, 0x81, 0xce,
	0x8d, 0xca, 0x4f, 0xf5, 0xb1, 0x84, 0x0b, 0xfb, 0x5a, 0xb5, 0xe4, 0xd8, 0x26, 0x80, 0x81, 0x2d,
	0x69, 0xc5, 0x56, 0x65, 0x86, 0xa0, 0xdb, 0xb0, 0x62, 0x5d, 0x60, 0x54, 0x87, 0x5c, 0xe4, 0x9c,
	0x1b, 0xab, 0x9f, 0x6d, 0xc0, 0xaf, 0xab, 0xd0, 0x48, 0x4e, 0x60, 0x91, 0x0a, 0x44, 0x5f, 0xcc,
	0xe6, 0xb8, 0xb9, 0x73, 0x39, 0x25, 0x9c, 0x13, 0x41, 0xe1, 0x04, 0x50, 0x0b, 0x1a, 0xbb, 0x71,
	0x18, 0x9a, 0x24, 0xd7, 0x8c, 0xfd, 0x54, 0x46, 0x97, 0x61, 0xe5, 0x11, 0x3b, 0xa2, 0xdc, 0x2c,
	0x2e, 0x99, 0xc5, 0x0c, 0xd0, 0x89, 0xd8, 0x25, 0x63, 0x16, 0xda, 0x03, 0xaa, 0x9b, 0xe5, 0x1c,
	0xa2, 0x77, 0x77, 0x8f, 0x88, 0x22, 0xd1, 0xb3, 0x28, 0xf4, 0xce, 0xd8, 0xdd, 0x29, 0xa0, 0x79,
	0x1f, 0x8b, 0x41, 0x9f, 0xa9, 0x90, 0x7a, 0xcb, 0x96, 0x37, 0x91, 0xd1, 0x35, 0x38, 0xfb, 0x15,
	0x91, 0x87, 0x34, 0xd8, 0x23, 0x52, 0xbe, 0x14, 0x51, 0xe0, 0x35, 0x8c, 0x46, 0x09, 0xc5, 0x1f,
	0xc3, 0x46, 0x77, 0xc2, 0xfa, 0xe2, 0x39, 0xe5, 0x4f, 0xc4, 0x88, 0xf1, 0xa4, 0x6b, 0x36, 0xa0,
	0x6e, 0x40, 0x97, 0x30, 0x2b, 0xe0, 0x6f, 0xe1, 0xe2, 0x5e, 0x48, 0x18, 0xd7, 0xe9, 0x2d, 0xa8,
	0xb7, 0x6c, 0xca, 0x73, 0x75, 0x96, 0xca, 0x7a, 0x2d, 0x75, 0xc2, 0xf6, 0x56, 0x2a, 0xe3, 0x03,
	0x58, 0x73, 0x76, 0xb2, 0x8b, 0x67, 0x3f, 0x1e, 0x0e, 0x93, 0xa3, 0x6a, 0xf8, 0x89, 0x98, 0x79,
	0x54, 0xcd, 0x79, 0x84, 0xae, 0xc2, 0x92, 0x26, 0x32, 0x79, 0x9f, 0xdb, 0x82, 0x66, 0x59, 0xd7,
	0xc4, 0xb2, 0xab, 0x4a, 0x74, 0x16, 0xaa, 0x3d, 0x7b, 0xad, 0xad, 0xfa, 0xd5, 0x5e, 0x80, 0x10,
	0x2c, 0xe5, 0xfa, 0xde, 0x7c, 0xa3, 0x6d, 0x58, 0xef, 0xc6, 0x4a, 0x8c, 0xcd, 0x3d, 0xdd, 0x17,
	0x22, 0xb4, 0xb5, 0xbf, 0xe2, 0x97, 0x61, 0xbd, 0xbb, 0x4f, 0x46, 0xd2, 0x5b, 0x32, 0xcb, 0xe6,
	0x1b, 0x7d, 0x09, 0xd0, 0x55, 0x2a, 0x62, 0x83, 0x58, 0x51, 0xe9, 0xd5, 0x4d, 0x01, 0x6f, 0x95,
	0x9b, 0xa6, 0x9d, 0xa9, 0x3c, 0xe4, 0x2a, 0x9a, 0xfa, 0xb9, 0x3d, 0xe8, 0x36, 0x34, 0x9f, 0x10,
	0xa9, 0x9e, 0x4d, 0x02, 0xa2, 0x68, 0x60, 0x8e, 0xbe, 0xb9, 0xd3, 0x6a, 0xdb, 0x67, 0xa4, 0x9d,
	0xbc, 0x33, 0xed, 0x7e, 0xf2, 0xce, 0xf8, 0x79, 0xf5, 0xd6, 0x1d, 0x58, 0x2f, 0x19, 0x47, 0xe7,
	0xa0, 0xf6, 0x9c, 0x4e, 0xdd, 0xd9, 0xe8, 0x4f, 0x9d, 0xcf, 0x23, 0x12, 0xc6, 0x49, 0xdc, 0x56,
	0xb8, 0x55, 0xfd, 0xac, 0x82, 0x7b, 0xb6, 0xfd, 0x04, 0xa7, 0x7c, 0xb1, 0x6c, 0x79, 0x69, 0x72,
	0x5d, 0xfd, 0x27, 0x22, 0x1e, 0xc3, 0xf2, 0x2e, 0x25, 0x2a, 0x8e, 0xe8, 0x42, 0x86, 0xdc, 0x8d,
	0x65, 0x98, 0x7b, 0x81, 0x31, 0xb6, 0xea, 0xe7, 0x21, 0xdd, 0x11, 0xce, 0x76, 0x2f, 0x48, 0xfa,
	0x29, 0x05, 0xf0, 0xbf, 0x55, 0x68, 0xf4, 0xa9, 0x54, 0x43, 0x22, 0x17, 0x23, 0xbc, 0x02, 0x6b,
	0xd9, 0x81, 0x7e, 0x4d, 0xa7, 0xce, 0xff, 0x22, 0xa8, 0x9b, 0xa9, 0x78, 0xec, 0x8e, 0xb9, 0x84,
	0x96, 0xdd, 0xaf, 0xcf, 0xba, 0xef, 0xc1, 0xf2, 0x03, 0x1a, 0xd2, 0xe4, 0x4c, 0x1b, 0x7e, 0x22,
	0xa2, 0xeb, 0x70, 0xae, 0x37, 0x9e, 0x88, 0x48, 0x11, 0x3e, 0xa4, 0x3e, 0x51, 0x8c, 0x8f, 0x4c,
	0x53, 0xd7, 0xfd, 0x19, 0x5c, 0x7b, 0xdd, 0xe3, 0x64, 0xa8, 0xd8, 0x11, 0x7d, 0x2a, 0x74, 0x89,
	0x35, 0x4c, 0xf1, 0x15, 0xc1, 0x62, 0xaa, 0x56, 0x4a, 0xa9, 0xd2, 0x15, 0xbe, 0xaf, 0xc8, 0x80,
	0x85, 0x4c, 0x4d, 0x1d, 0x1d, 0x18, 0xba, 0x32, 0xac, 0x0b, 0x65, 0x5f, 0xd1, 0x89, 0xf4, 0x9a,
	0x86, 0xc5, 0x0a, 0x69, 0xdd, 0xaf, 0x66, 0x75, 0x8f, 0x3b, 0xb0, 0xa2, 0xb3, 0x3f, 0x09, 0x09,
	0x97, 0x8b, 0xa4, 0x1f, 0xbf, 0x72, 0xe7, 0x15, 0xc5, 0x8b, 0x6d, 0x28, 0xc6, 0x54, 0x2b, 0xc7,
	0xb4, 0x01, 0xf5, 0x7b, 0x31, 0x0b, 0x93, 0xc2, 0xb0, 0x02, 0xba, 0x05, 0xe0, 0xc7, 0x7c, 0x5f,
	0x91, 0x48, 0xa7, 0xbd, 0x7e, 0x6a, 0x2b, 0xe5, 0xb4, 0x75, 0x1f, 0xfa, 0x31, 0xdf, 0x65, 0x9c,
	0xe9, 0x5b, 0x73, 0x91, 0x3e, 0xcc, 0xa9, 0xdb, 0xcc, 0x11, 0x95, 0xdc, 0xce, 0x56, 0xd0, 0x97,
	0x7e, 0x92, 0xa5, 0x5e, 0x72, 0x2d, 0xe7, 0x90, 0x9d, 0x7f, 0xaa, 0xb0, 0xa4, 0x47, 0x32, 0xf4,
	0x47, 0x05, 0x56, 0xf3, 0xd3, 0x19, 0xca, 0xde, 0xa4, 0x39, 0xf3, 0x62, 0xeb, 0xbd, 0x37, 0xac,
	0xda, 0x9b, 0x15, 0x3f, 0xfa, 0xe5, 0xaf, 0xbf, 0x7f, 0xaf, 0x76, 0xd1, 0x5d, 0x3b, 0x85, 0xc6,
	0xea, 0xb0, 0xc3, 0x72, 0x7a, 0x9d, 0xe3, 0xdc, 0x60, 0x70, 0xd2, 0x39, 0xce, 0x0d, 0x21, 0x5a,
	0x4a, 0x9f, 0xbb, 0x13, 0x24, 0xe1, 0xac, 0xb9, 0xb3, 0xbf, 0x67, 0xea, 0xd0, 0x5e, 0xc2, 0x19,
	0xf3, 0xbc, 0xb7, 0xa4, 0xf5, 0x4e, 0xba, 0x5c, 0xb8, 0xeb, 0xf1, 0x75, 0xe3, 0xd1, 0x15, 0x84,
	0x33, 0x8f, 0x42, 0xad, 0x70, 0xe3, 0x25, 0x53, 0x87, 0x37, 0x94, 0xb6, 0xd3, 0x39, 0x36, 0xe6,
	0x4e, 0xd0, 0x08, 0x36, 0x52, 0xd2, 0xfb, 0x11, 0x0d, 0x28, 0x57, 0x8c, 0x84, 0x12, 0xe5, 0x66,
	0x91, 0x79, 0x0f, 0xd3, 0x1b, 0xb9, 0xdf, 0x35, 0xdc, 0xe7, 0xf1, 0x7a, 0x89, 0x7b, 0xe7, 0xb7,
	0x1a, 0xd4, 0xcd, 0xac, 0x87, 0x06, 0xd0, 0x7c, 0x44, 0x55, 0x3a, 0x49, 0x78, 0xb3, 0x6f, 0x8b,
	0xe3, 0x98, 0x7d, 0x75, 0xf0, 0x35, 0x63, 0x7e, 0x0b, 0x6d, 0x1a, 0xf3, 0x66, 0x0a, 0xec, 0x30,
	0x7e, 0x20, 0x3a, 0xc7, 0xf9, 0xc9, 0xe3, 0x04, 0xfd, 0x5a, 0x01, 0xe4, 0x48, 0x72, 0x03, 0x30,
	0xba, 0x52, 0xb0, 0xf8, 0x86, 0xd1, 0xb8, 0x75, 0xa9, 0xa8, 0x55, 0x18, 0x4e, 0xf1, 0x47, 0xc6,
	0x83, 0xab, 0xe8, 0x83, 0x9c, 0x07, 0x83, 0xe9, 0x8d, 0xa1, 0xb5, 0x53, 0x3c, 0x6d, 0xf4, 0xaa,
	0xe8, 0x46, 0xf2, 0x52, 0xce, 0xba, 0x31, 0x67, 0xc0, 0x7e, 0xbb, 0x1b, 0x9f, 0x1b, 0x37, 0x6e,
	0xa2, 0x4f, 0x8a, 0x6e, 0x4c, 0xac, 0x9d, 0xb7, 0x15, 0xdd, 0xbd, 0x07, 0x70, 0x69, 0x28, 0xc6,
	0xa9, 0xf1, 0x61, 0xc8, 0x28, 0x57, 0x69, 0xcf, 0xfd, 0x90, 0xfc, 0x7d, 0xbd, 0xae, 0xbe, 0x4d,
	0x6d, 0x70, 0xc6, 0x7c, 0xdd, 0xfc, 0x2f, 0x00, 0x00, 0xff, 0xff, 0xce, 0xff, 0x56, 0xd7, 0xba,
	0x0d, 0x00, 0x00,
}
