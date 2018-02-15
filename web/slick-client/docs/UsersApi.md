# SlickClient.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCurrentUserInfo**](UsersApi.md#getCurrentUserInfo) | **GET** /api/users/current | 
[**getUserInfo**](UsersApi.md#getUserInfo) | **GET** /api/users/info/{EmailAddress} | 
[**getUsersForCompany**](UsersApi.md#getUsersForCompany) | **GET** /api/users/by-company/{CompanyName} | 
[**getUsersForProject**](UsersApi.md#getUsersForProject) | **GET** /api/users/by-project/{CompanyName}/{ProjectName} | 


<a name="getCurrentUserInfo"></a>
# **getCurrentUserInfo**
> SlickqaUserInfo getCurrentUserInfo()



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.UsersApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCurrentUserInfo(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SlickqaUserInfo**](SlickqaUserInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getUserInfo"></a>
# **getUserInfo**
> SlickqaUserInfo getUserInfo(emailAddress)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.UsersApi();

var emailAddress = "emailAddress_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUserInfo(emailAddress, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **emailAddress** | **String**|  | 

### Return type

[**SlickqaUserInfo**](SlickqaUserInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getUsersForCompany"></a>
# **getUsersForCompany**
> SlickqaUsersQueryResponse getUsersForCompany(companyName)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.UsersApi();

var companyName = "companyName_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUsersForCompany(companyName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyName** | **String**|  | 

### Return type

[**SlickqaUsersQueryResponse**](SlickqaUsersQueryResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getUsersForProject"></a>
# **getUsersForProject**
> SlickqaUsersQueryResponse getUsersForProject(companyName, projectName)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.UsersApi();

var companyName = "companyName_example"; // String | 

var projectName = "projectName_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUsersForProject(companyName, projectName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyName** | **String**|  | 
 **projectName** | **String**|  | 

### Return type

[**SlickqaUsersQueryResponse**](SlickqaUsersQueryResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

