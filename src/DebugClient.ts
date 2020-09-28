import {ApiClient, ApiClientOptions} from "./ApiClient";
import {AccessTokenRole, GetAccessTokenInput, PostLoginCheckInput} from "./ApiInput";
import {ApiEndpoint, GetAccessTokenEndpoint, PostLoginCheckEndpoint} from "./ApiEndpoint";
import * as ipify from "ipify2";
import {LoginCheckResult} from "@/ApiResult";

export interface DebugClientOptions extends ApiClientOptions {
    authCode: string,
    apiKey: string,
    customerKey: string,
}

export class DebugClient extends ApiClient {
    protected _authCode: string | undefined;
    protected _apiKey: string | undefined;


    constructor(options: DebugClientOptions) {
        super(options);
        this.authCode = options.authCode;
        this.apiKey = options.apiKey;

        if (!this.accessToken) {
            let _ = this.fetchAccessToken(options.customerKey, options.role);
        }
    }

    set apiKey(newValue: string | undefined) {
        this._apiKey = newValue;
    }

    get apiKey(): string | undefined {
        return this._apiKey;
    }

    set authCode(newValue: string | undefined) {
        this._authCode = newValue;
    }

    get authCode(): string | undefined {
        return this._authCode;
    }

    async fetchApiAccessToken(customerKey: string) {
        let input = <GetAccessTokenInput>{
            customer_key: customerKey,
            role: AccessTokenRole.Api
        }
        let promise = this.process(input, GetAccessTokenEndpoint).then(result => {
            this.accessToken = result.results.access_token;
            this.parseAccessToken();
            return this;
        })
        if (this.initializationCallback) {
            return promise.then(this.initializationCallback);
        } else {
            return promise;
        }
    }

    async fetchAuthAccessToken(customerKey: string) {
        let ipv4 = await ipify.ipv4();
        let input1 = <PostLoginCheckInput>{
            ip: ipv4,
            user_agent: navigator.userAgent,
            customer_key: customerKey
        };
        let result1: LoginCheckResult = await this.process(input1, PostLoginCheckEndpoint);
        let input2 = <GetAccessTokenInput>{
            customer_key: customerKey,
            login_key: result1.results.login_key,
            role: AccessTokenRole.Auth
        }
        let promise = this.process(input2, GetAccessTokenEndpoint).then(result => {
            this.accessToken = result.results.access_token;
            this.parseAccessToken();

            return this;

        })
        if (this.initializationCallback) {
            return promise.then(this.initializationCallback);
        } else {
            return promise;
        }

    }

    async fetchAccessToken(customerKey: string, role: string) {
        if (role == AccessTokenRole.Api) {
            await this.fetchApiAccessToken(customerKey);
        } else if (role == AccessTokenRole.Auth) {
            await this.fetchAuthAccessToken(customerKey);
        }
    }

    protected authenticationGuard<T>(endpoint: ApiEndpoint<T>) {
    }

}
