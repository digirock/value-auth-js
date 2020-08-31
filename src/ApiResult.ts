import {AccessKbn, LocationKbn, SendKbn} from "ApiInput";

export interface Model {

}

export interface Customer extends Model {
    customer_key: string;
}

export interface Contact extends Model {
    id: number;
    address?: string;
    send_kbn?: SendKbn;
    location_kbn?: LocationKbn;
    country?: string;
    state?: string;
    city?: string;
    memo?: string;
}

export interface IpAddressRestriction extends Model {
    id: number;
    ip: string;
    access_kbn: AccessKbn;
}

export interface LoginLog extends Model {
    id: number;
    ip: string;
    user_agent: string;
    address: string;
    is_success: boolean;
    fraud_point: string;
    date?: string;
}

export interface CountryRestriction extends Model {
    id: number;
    country: string;
    access_kbn: AccessKbn;
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

export interface IpAddressRestrictionListResultContent {
    customer: Customer;
    customer_ips: Array<IpAddressRestriction>;
}

export interface IpAddressRestrictionResultContent {
    customer: Customer;
    customer_ip: IpAddressRestriction;
}

export interface LoginLogResultContent {
    customer: Customer;
    customer_login_log: LoginLog;
}

export interface CountryRestrictionListResultContent {
    customer: Customer;
    customer_overseas: Array<CountryRestriction>;
}

export interface CountryRestrictionResultContent {
    customer: Customer;
    customer_oversea: CountryRestriction;
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
export type CountryRestrictionResult = ApiResult<CountryRestrictionListResultContent>;
export type IpAddressRestrictionResult = ApiResult<IpAddressRestrictionResultContent>;
export type IpAddressRestrictionListResult = ApiResult<IpAddressRestrictionListResultContent>;
export type LoginLogResult = ApiResult<LoginLogResultContent>;
export type DueDateResult = ApiResult<DueDateResultContent>;
export type StringResult = ApiResult<string>;