/** @module Version */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @return {Promise<HttpResponse<slickqaVersionInfoResponse>>}
 */
export function GetFullVersion() {
  return gateway.request(GetFullVersionOperation)
}

const GetFullVersionOperation = {
  path: '/api/version',
  method: 'get'
}
