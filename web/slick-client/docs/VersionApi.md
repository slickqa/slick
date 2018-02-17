# SlickClient.VersionApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFullVersion**](VersionApi.md#getFullVersion) | **GET** /api/version | 


<a name="getFullVersion"></a>
# **getFullVersion**
> SlickqaVersionInfoResponse getFullVersion()



### Example
```javascript
var SlickClient = require('slick-client');

var apiInstance = new SlickClient.VersionApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getFullVersion(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SlickqaVersionInfoResponse**](SlickqaVersionInfoResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

