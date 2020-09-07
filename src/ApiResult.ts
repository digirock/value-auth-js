import {AccessKbn, LocationKbn, SendKbn} from "@/client/ApiInput";

export interface Model {
    id?: number
}

export interface Customer extends Model {
    customer_key: string;
}

export interface Contact extends Model {
    address?: string;
    send_kbn?: SendKbn;

}

export interface LocationRestriction extends Model {
    location_kbn?: LocationKbn;
    country?: string;
    state?: string;
    city?: string;
    memo?: string;
}

export interface IpAddressRestriction extends Model {
    ip: string;
    access_kbn: AccessKbn;
}

export interface LoginLog extends Model {
    ip: string;
    user_agent: string;
    address: string;
    is_success: boolean;
    fraud_point: string;
    date?: string;
}

export interface CountryRestriction extends Model {
    country?: string;
    access_kbn: AccessKbn;
}

export interface CustomerSetting extends Model {
    max_attempts: number,
    security_level: number,
}

export interface DueDateResultContent {
    due_date: string;
}

export interface TwoFactorAuthSendResultContent {
    customer_key: string,
    due_date: string
}

export interface AccessTokenResultContent {
    access_token: string;
}

export interface AuthTokenResultContent {
    status: string;
    auth_token: string;
}

export interface ContactListResultContent {
    customer: Customer;
    customer_contacts: Array<Contact>;
}

export interface ContactResultContent {
    customer: Customer;
    customer_contact: Contact;
}

export interface LocationRestrictionListResultContent {
    customer: Customer;
    customer_locations: Array<LocationRestriction>;
}

export interface LocationRestrictionResultContent {
    customer: Customer;
    customer_location: LocationRestriction;
}

export interface IpAddressRestrictionListResultContent {
    customer: Customer;
    customer_ip: Array<IpAddressRestriction>;
}

export interface IpAddressRestrictionResultContent {
    customer: Customer;
    customer_ip: IpAddressRestriction;
}

export interface LoginLogResultContent {
    customer: Customer;
    customer_login_log: LoginLog;
}

export interface LoginLogListResultContent {
    customer: Customer;
    customer_login_logs: Array<LoginLog>;
}

export interface CountryRestrictionListResultContent {
    customer: Customer;
    customer_oversea: Array<CountryRestriction>;
}

export interface CountryRestrictionResultContent {
    customer: Customer;
    customer_oversea: CountryRestriction;
}

export interface CustomerSettingResultContent {
    customer: Customer;
    customer_setting: CustomerSetting;
}


export interface ApiResult<ResultContent> {
    results: ResultContent;
}

export type ContactListResult = ApiResult<ContactListResultContent>;
export type ContactResult = ApiResult<ContactResultContent>;
export type AuthTokenResult = ApiResult<AuthTokenResultContent>;
export type TwoFactorAuthSendResult = ApiResult<TwoFactorAuthSendResultContent>;
export type AccessTokenResult = ApiResult<AccessTokenResultContent>;
export type CountryRestrictionListResult = ApiResult<CountryRestrictionListResultContent>;
export type CountryRestrictionResult = ApiResult<CountryRestrictionResultContent>;
export type LocationRestrictionResult = ApiResult<LocationRestrictionResultContent>;
export type LocationRestrictionListResult = ApiResult<LocationRestrictionListResultContent>;
export type IpAddressRestrictionResult = ApiResult<IpAddressRestrictionResultContent>;
export type IpAddressRestrictionListResult = ApiResult<IpAddressRestrictionListResultContent>;
export type LoginLogResult = ApiResult<LoginLogResultContent>;
export type LoginLogListResult = ApiResult<LoginLogListResultContent>;
export type CustomerSettingResult = ApiResult<CustomerSettingResultContent>;
export type DueDateResult = ApiResult<DueDateResultContent>;
export type StringResult = ApiResult<string>;