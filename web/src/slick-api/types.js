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
 * @property {string} Name 
 * @property {string} UIViewType 
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
 * @typedef {Object} slickqaProjectPermissionInfo
 * @memberof module:types
 * 
 * @property {string} ProjectName 
 * @property {string[]} Roles 
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
