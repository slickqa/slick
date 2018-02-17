# SlickClient.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**isAuthorized**](AuthApi.md#isAuthorized) | **GET** /api/auth/isAuthorized/{CompanyName}/{ProjectName}/{Permission} | 
[**loginWithCredentials**](AuthApi.md#loginWithCredentials) | **POST** /api/auth/login | 
[**loginWithToken**](AuthApi.md#loginWithToken) | **GET** /api/auth/login-with-token/{Token} | 


<a name="isAuthorized"></a>
# **isAuthorized**
> SlickqaIsAuthorizedResponse isAuthorized(companyName, projectName, permission)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.AuthApi();

var companyName = "companyName_example"; // String | 

var projectName = "projectName_example"; // String | 

var permission = 789; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.isAuthorized(companyName, projectName, permission, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyName** | **String**|  | 
 **projectName** | **String**|  | 
 **permission** | **Number**|  | 

### Return type

[**SlickqaIsAuthorizedResponse**](SlickqaIsAuthorizedResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="loginWithCredentials"></a>
# **loginWithCredentials**
> SlickqaLoginResponse loginWithCredentials(body)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.AuthApi();

var body = new SlickClient.SlickqaPlainUserLoginRequest(); // SlickqaPlainUserLoginRequest | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.loginWithCredentials(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SlickqaPlainUserLoginRequest**](SlickqaPlainUserLoginRequest.md)|  | 

### Return type

[**SlickqaLoginResponse**](SlickqaLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="loginWithToken"></a>
# **loginWithToken**
> SlickqaLoginResponse loginWithToken(token)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.AuthApi();

var token = "token_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.loginWithToken(token, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | **String**|  | 

### Return type

[**SlickqaLoginResponse**](SlickqaLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

