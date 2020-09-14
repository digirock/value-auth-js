export interface ApiInput {
    customer_key?: string,
}

export enum SendKbn {
    Sms = 1,
    Email
}

export enum AccessKbn {
    Allow = 1,
    Deny
}

export enum LocationKbn {
    Abstract = 1,
    Detailed
}

export interface GetAccessTokenInput extends ApiInput {
    customer_key: string,
    auth_code: string,
    role: string
}

export interface GetKycCodeInput extends ApiInput {
    send_kbn: SendKbn,
    address: string,
    ip?: string
}

export interface PostKycCodeInput extends ApiInput {
    address: string,
    number: string
}

export interface Get2FACodeInput extends ApiInput {
    ip?: string
}

export interface Post2FACodeInput extends ApiInput {
    number: string
}

export interface GetContactInput extends ApiInput {
    send_kbn?: SendKbn
}

export interface PostContactInput extends ApiInput {
    address: string,
    send_kbn: SendKbn
}

export interface PutContactInput extends ApiInput {
    address: string,
    send_kbn: SendKbn
}

export interface DeleteContactInput extends ApiInput {
    id: number,
}

export interface GetLocationRestrictionInput extends ApiInput {
}

export interface PostLocationRestrictionInput extends ApiInput {
    location_kbn: LocationKbn,
    country: string,
    state: string,
    city?: string,
    memo?: string
}

export interface PutLocationRestrictionInput extends ApiInput {
    id: number,
    location_kbn: LocationKbn,
    country: string,
    state: string,
    city: string,
    memo: string
}

export interface DeleteLocationRestrictionInput extends ApiInput {
    id: number,
}

export interface GetIpAddressRestrictionInput extends ApiInput {
}

export interface PostIpAddressRestrictionInput extends ApiInput {
    ip: string,
    access_kbn: AccessKbn
}

export interface PutIpAddressRestrictionInput extends ApiInput {
    id: number,
    ip: string,
    access_kbn: AccessKbn
}

export interface DeleteIpAddressRestrictionInput extends ApiInput {
    id: string,
}

export interface GetCountryRestrictionInput extends ApiInput {
}

export interface PostCountryRestrictionInput extends ApiInput {
    country: string,
    access_kbn: AccessKbn
}

export interface PutCountryRestrictionInput extends ApiInput {
    id: number
    country: string,
    access_kbn: AccessKbn
}

export interface DeleteCountryRestrictionInput extends ApiInput {
    id: number,
}

export interface GetLoginLogInput extends ApiInput {
    page: number,
    limit: number
}

export interface PostLoginLogInput extends ApiInput {
    ip: string,
    user_agent: string,
    is_success: boolean
}

export interface GetCustomerSettingInput extends ApiInput {

}

export interface PutCustomerSettingInput extends ApiInput {
    max_attempts?: number,
    security_level?: number,
}
