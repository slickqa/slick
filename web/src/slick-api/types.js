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
 * @typedef {Object} slickqaAgentCurrentTest
 * @memberof module:types
 * 
 * @property {string} Name 
 * @property {string} Url 
 * @property {string} AutomationId 
 */

/**
 * @typedef {Object} slickqaAgentId
 * @memberof module:types
 * 
 * @property {string} Company 
 * @property {string} Name 
 */

/**
 * @typedef {Object} slickqaAgentStatus
 * @memberof module:types
 * 
 * @property {slickqaAgentId} Id 
 * @property {date} LastCheckin 
 * @property {string} RunStatus 
 * @property {string[]} Groups 
 * @property {slickqaAgentCurrentTest} CurrentTest 
 * @property {date} LastScreenshotUpdate 
 */

/**
 * @typedef {Object} slickqaAgentsResponse
 * @memberof module:types
 * 
 * @property {slickqaAgentStatus[]} Agents 
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
 * @typedef {Object} slickqaFileUploadInfo
 * @memberof module:types
 * 
 * @property {slickqaLinkIdentity} Id 
 * @property {string} Size 
 * @property {string} ContentType 
 * @property {string} FileName 
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
 * @property {slickqaLinkIdentity} Id 
 * @property {string} Type 
 * @property {number} Order 
 * @property {string} Url 
 * @property {string} Creator 
 * @property {slickqaSlickFile} FileInfo 
 * @property {date} Updated 
 */

/**
 * @typedef {Object} slickqaLinkIdentity
 * @memberof module:types
 * 
 * @property {string} Company 
 * @property {string} Project 
 * @property {string} EntityType 
 * @property {string} EntityId 
 * @property {string} Name 
 */

/**
 * @typedef {Object} slickqaLinkList
 * @memberof module:types
 * 
 * @property {slickqaLink[]} links 
 */

/**
 * @typedef {Object} slickqaLinkUrl
 * @memberof module:types
 * 
 * @property {string} Url 
 * @property {date} Expires 
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
 * @typedef {Object} slickqaScreenshotUpdateRequest
 * @memberof module:types
 * 
 * @property {slickqaAgentId} Id 
 */

/**
 * @typedef {Object} slickqaSlickFile
 * @memberof module:types
 * 
 * @property {string} Path 
 * @property {string} FileName 
 * @property {string} ContentType 
 * @property {string} Size 
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
 * @property {string} ApiToken 
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
