/** @module types */
// Auto-generated, edits will be overwritten

/**
 * @typedef {Object} slickqaAddUserRequest
 * @memberof module:types
 * 
 * @property {string} UserEmail 
 * @property {string} CompanyName 
 * @property {slickqaCompanyPermissionInfo} Permissions 
 */

/**
 * @typedef {Object} slickqaAvailableCompanySettings
 * @memberof module:types
 * 
 * @property {slickqaCompanySettings[]} Companies 
 */

/**
 * @typedef {Object} slickqaCompanyPermissionInfo
 * @memberof module:types
 * 
 * @property {string} CompanyName 
 * @property {number} CompanyAdmin 
 * @property {slickqaProjectPermissionInfo[]} Projects 
 */

/**
 * @typedef {Object} slickqaCompanySettings
 * @memberof module:types
 * 
 * @property {string} CompanyName 
 * @property {slickqaPreferences} UserPreferenceTemplate 
 * @property {string} CustomIconUrl 
 * @property {slickqaLink[]} Links 
 * @property {string} CompanyBannerUrl 
 * @property {slickqaS3StorageSettings} StorageSettings 
 */

/**
 * @typedef {Object} slickqaCompanySettingsRequest
 * @memberof module:types
 * 
 * @property {string} CompanyName 
 */

/**
 * @typedef {Object} slickqaIsAuthorizedResponse
 * @memberof module:types
 * 
 * @property {boolean} Allowed 
 * @property {string} Message 
 */

/**
 * @typedef {Object} slickqaLink
 * @memberof module:types
 * 
 * @property {string} Url 
 * @property {number} Order 
 * @property {string} Type 
 * @property {string} ContentId 
 */

/**
 * @typedef {Object} slickqaLinkList
 * @memberof module:types
 * 
 * @property {slickqaLinkListIdentity} Id 
 * @property {object} links 
 */

/**
 * @typedef {Object} slickqaLinkListIdentity
 * @memberof module:types
 * 
 * @property {string} Company 
 * @property {string} Project 
 * @property {string} EntityType 
 * @property {string} EntityId 
 */

/**
 * @typedef {Object} slickqaLoginResponse
 * @memberof module:types
 * 
 * @property {boolean} Success 
 * @property {string} Token 
 * @property {slickqaUserInfo} User 
 */

/**
 * @typedef {Object} slickqaPlainUserLoginRequest
 * @memberof module:types
 * 
 * @property {string} UserName 
 * @property {string} Password 
 */

/**
 * @typedef {Object} slickqaPreferences
 * @memberof module:types
 * 
 * @property {string} HomeUrl 
 * @property {string} Theme 
 * @property {string} BackgroundUrl 
 * @property {slickqaLink[]} Favorites 
 */

/**
 * @typedef {Object} slickqaProject
 * @memberof module:types
 * 
 * @property {slickqaProjectIdentity} Id 
 * @property {slickqaLink[]} Links 
 * @property {string[]} AutomationTools 
 * @property {string[]} Tags 
 * @property {object} Attributes 
 * @property {date} LastUpdated 
 */

/**
 * @typedef {Object} slickqaProjectIdentity
 * @memberof module:types
 * 
 * @property {string} Company 
 * @property {string} Name 
 */

/**
 * @typedef {Object} slickqaProjectPermissionInfo
 * @memberof module:types
 * 
 * @property {string} ProjectName 
 * @property {string[]} Roles 
 */

/**
 * @typedef {Object} slickqaProjectsListResponse
 * @memberof module:types
 * 
 * @property {slickqaProject[]} Projects 
 */

/**
 * @typedef {Object} slickqaS3StorageSettings
 * @memberof module:types
 * 
 * @property {string} BaseUrl 
 * @property {string} AccessKey 
 * @property {string} SecretKey 
 * @property {string} Bucket 
 * @property {string} Prefix 
 */

/**
 * @typedef {Object} slickqaSlickPermissionInfo
 * @memberof module:types
 * 
 * @property {number} SlickAdmin 
 * @property {slickqaCompanyPermissionInfo[]} Companies 
 */

/**
 * @typedef {Object} slickqaUserInfo
 * @memberof module:types
 * 
 * @property {string} EmailAddress 
 * @property {slickqaSlickPermissionInfo} Permissions 
 * @property {string} FullName 
 * @property {string} GivenName 
 * @property {string} FamilyName 
 * @property {string} AvatarUrl 
 * @property {string} JobTitle 
 * @property {string} HashedPassword 
 * @property {slickqaPreferences} UserPreferences 
 */

/**
 * @typedef {Object} slickqaUsersQueryResponse
 * @memberof module:types
 * 
 * @property {slickqaUserInfo[]} users 
 */

/**
 * @typedef {Object} slickqaVersionInfoResponse
 * @memberof module:types
 * 
 * @property {string} Version 
 */

/**
 * @typedef {Object} RawHttpResponse
 * @property {string} type
 * @property {string} url
 * @property {bool} redirected
 * @property {number} status
 * @property {bool} ok
 * @property {string} statusText
 * @property {bool} bodyUsed
 */

/**
 * @typedef {Object} HttpResponse
 * @template T
 * @property {T} data
 * @property {RawHttpResponse} raw
 */
