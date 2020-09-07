export interface ApiInput {

}

export enum SendKbn {
    Sms = 1,
    Email
}

export enum AccessKbn {
    Allow = 1,
    Deny
}

export enum LocationKbn{
    Abstract = 1,
    Detailed
}

export interface GetAccessTokenInput extends ApiInput {
    customer_key: string
}

export interface GetKycCodeInput extends ApiInput {
    send_kbn: SendKbn,
    address: string,
    ip?: string
}

export interface PostKycCodeInput extends ApiInput {
    address: string,
    number: number
}

export interface Get2FACodeInput extends ApiInput {
    ip?: string
}

export interface Post2FACodeInput extends ApiInput {
    number: number
}

export interface GetContactInput extends ApiInput {
    customer_key?: string,
    send_kbn?: SendKbn
}

export interface PostContactInput extends ApiInput {
    customer_key?: string,
    address: string,
    send_kbn: SendKbn
}

export interface PutContactInput extends ApiInput {
    customer_key?: string,
    address: string,
    send_kbn: SendKbn
}

export interface DeleteContactInput extends ApiInput {
    id: number,
    customer_key?: string
}

export interface GetLocationRestrictionInput extends ApiInput {
    customer_key?: string
}

export interface PostLocationRestrictionInput extends ApiInput {
    customer_key?: string,
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
    customer_key?: string
}

export interface PostIpAddressRestrictionInput extends ApiInput {
    customer_key?: string,
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
    customer_key?: string
}

export interface PostCountryRestrictionInput extends ApiInput {
    customer_key?: string,
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

export interface PostLoginLogInput extends ApiInput {
    customer_key?: string,
    ip: string,
    user_agent: string,
    is_success: boolean
}
