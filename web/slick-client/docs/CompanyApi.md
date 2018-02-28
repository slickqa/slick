# SlickClient.CompanyApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCompanySettings**](CompanyApi.md#createCompanySettings) | **POST** /api/companies | 
[**getCompanySettings**](CompanyApi.md#getCompanySettings) | **GET** /api/companies/{CompanyName} | 
[**updateCompanySettings**](CompanyApi.md#updateCompanySettings) | **PUT** /api/companies/{CompanyName} | 


<a name="createCompanySettings"></a>
# **createCompanySettings**
> SlickqaCompanySettings createCompanySettings(body)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.CompanyApi();

var body = new SlickClient.SlickqaCompanySettings(); // SlickqaCompanySettings | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createCompanySettings(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SlickqaCompanySettings**](SlickqaCompanySettings.md)|  | 

### Return type

[**SlickqaCompanySettings**](SlickqaCompanySettings.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getCompanySettings"></a>
# **getCompanySettings**
> SlickqaCompanySettings getCompanySettings(companyName)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.CompanyApi();

var companyName = "companyName_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getCompanySettings(companyName, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyName** | **String**|  | 

### Return type

[**SlickqaCompanySettings**](SlickqaCompanySettings.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateCompanySettings"></a>
# **updateCompanySettings**
> SlickqaCompanySettings updateCompanySettings(companyName, body)



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.CompanyApi();

var companyName = "companyName_example"; // String | 

var body = new SlickClient.SlickqaCompanySettings(); // SlickqaCompanySettings | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateCompanySettings(companyName, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyName** | **String**|  | 
 **body** | [**SlickqaCompanySettings**](SlickqaCompanySettings.md)|  | 

### Return type

[**SlickqaCompanySettings**](SlickqaCompanySettings.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

