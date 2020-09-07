import {
    AccessTokenResult,
    AuthTokenResult,
    ContactListResult,
    ContactResult,
    CountryRestrictionListResult,
    CountryRestrictionResult, CustomerSettingResult,
    DueDateResult,
    IpAddressRestrictionListResult,
    IpAddressRestrictionResult, LocationRestrictionListResult, LocationRestrictionResult,
    LoginLogResult,
    StringResult,
    TwoFactorAuthSendResult
} from "@/client/ApiResult";

export interface ApiEndpoint<ResultType> {
    method: string,
    path: string,
    pathParams?: string[],
    queryParams?: string[],
    bodyParams?: string[],
}

export const GetAccessTokenEndpoint: ApiEndpoint<AccessTokenResult> = {
    method: 'get',
    path: '/auth/accesstoken',
    queryParams: ['customer_key']
}

export const GetKycEndpoint: ApiEndpoint<DueDateResult> = {
    method: 'get',
    path: "/auth",
    queryParams: ['send_kbn', 'address', 'ip'],
}

export const PostKycEndpoint: ApiEndpoint<StringResult> = {
    method: 'post',
    path: "/auth",
    bodyParams: ['address', 'number']
}

export const Get2FACodeEndpoint: ApiEndpoint<TwoFactorAuthSendResult> = {
    method: 'get',
    path: "/twofactor",
    queryParams: ['customer_key', 'ip']
}

export const Post2FACodeEndpoint: ApiEndpoint<AuthTokenResult> = {
    method: 'post',
    path: "/twofactor",
    bodyParams: ['customer_key', 'number']
}

export const GetContactEndpoint: ApiEndpoint<ContactListResult> = {
    method: 'get',
    path: "/twofactor/contact",
    queryParams: ['customer_key', 'send_kbn']
}

export const PostContactEndpoint: ApiEndpoint<ContactResult> = {
    method: 'post',
    path: "/twofactor/contact",
    bodyParams: ['customer_key', 'address', 'send_kbn']
}

export const PutContactEndpoint: ApiEndpoint<ContactResult> = {
    method: 'put',
    path: "/twofactor/contact/{id}",
    pathParams: ['id'],
    bodyParams: ['customer_key', 'address', 'send_kbn']
}

export const DeleteContactEndpoint: ApiEndpoint<ContactResult> = {
    method: 'delete',
    path: "/twofactor/contact/{id}",
    pathParams: ['id'],
    queryParams: ['customer_key']
}

export const GetLocationRestrictionEndpoint: ApiEndpoint<LocationRestrictionListResult> = {
    method: 'get',
    path: '/twofactor/location',
    queryParams: ['customer_key']
}

export const PostLocationRestrictionEndpoint: ApiEndpoint<LocationRestrictionResult> = {
    method: 'post',
    path: '/twofactor/location',
    bodyParams: ['customer_key', 'location_kbn', 'country', 'state', 'city', 'memo']
}

export const PutLocationRestrictionEndpoint: ApiEndpoint<LocationRestrictionResult> = {
    method: 'put',
    path: '/twofactor/location/{id}',
    pathParams: ['id'],
    bodyParams: ['customer_key', 'location_kbn', 'country', 'state', 'city', 'memo']
}

export const DeleteLocationRestrictionEndpoint: ApiEndpoint<LocationRestrictionResult> = {
    method: 'delete',
    path: '/twofactor/location/{id}',
    pathParams: ['id']
}

export const GetIpAddressRestrictionEndpoint: ApiEndpoint<IpAddressRestrictionListResult> = {
    method: 'get',
    path: '/twofactor/ip',
    queryParams: ['customer_key']
}

export const PostIpAddressRestrictionEndpoint: ApiEndpoint<IpAddressRestrictionResult> = {
    method: 'post',
    path: '/twofactor/ip',
    bodyParams: ['customer_key', 'ip', 'access_kbn']
}

export const PutIpAddressRestrictionEndpoint: ApiEndpoint<IpAddressRestrictionResult> = {
    method: 'put',
    path: '/twofactor/ip/{id}',
    pathParams: ['id'],
    bodyParams: ['customer_key', 'ip', 'access_kbn']
}

export const DeleteIpAddressRestrictionEndpoint: ApiEndpoint<IpAddressRestrictionResult> = {
    method: 'delete',
    path: '/twofactor/ip/{id}',
    pathParams: ['id'],
}

export const GetCountryRestrictionEndpoint: ApiEndpoint<CountryRestrictionListResult> = {
    method: 'get',
    path: '/twofactor/oversea',
    queryParams: ['customer_key']
}

export const PostCountryRestrictionEndpoint: ApiEndpoint<CountryRestrictionResult> = {
    method: 'post',
    path: '/twofactor/oversea',
    bodyParams: ['customer_key', 'country', 'access_kbn']
}

export const PutCountryRestrictionEndpoint: ApiEndpoint<CountryRestrictionResult> = {
    method: 'put',
    path: '/twofactor/oversea/{id}',
    pathParams: ['id'],
    bodyParams: ['customer_key', 'country', 'access_kbn']
}

export const DeleteCountryRestrictionEndpoint: ApiEndpoint<CountryRestrictionResult> = {
    method: 'delete',
    path: '/twofactor/oversea/{id}',
    pathParams: ['id'],
}

export const PostLoginLogEndpoint: ApiEndpoint<LoginLogResult> = {
    method: 'post',
    path: '/twofactor/loginlog',
    bodyParams: ['customer_key', 'ip', 'user_agent', 'is_success']
}

export const GetCustomerSettingEndpoint: ApiEndpoint<CustomerSettingResult> = {
    method: 'get',
    path: '/twofactor/setting',
    queryParams: ['customer_key']
}

export const PutCustomerSettingEndpoint: ApiEndpoint<CustomerSettingResult> = {
    method: 'put',
    path: '/twofactor/setting',
    bodyParams: ['customer_key', 'max_attempts', 'security_level']
}
