import {ApiClient, ApiClientOptions} from "./ApiClient";
import {GetAccessTokenInput} from "./ApiInput";
import {ApiEndpoint, GetAccessTokenEndpoint} from "./ApiEndpoint";

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

    async fetchAccessToken(customerKey: string, role: string) {
        let input = <GetAccessTokenInput>{
            auth_code: this.authCode,
            customer_key: customerKey,
            role: role
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

    protected authenticationGuard<T>(endpoint: ApiEndpoint<T>) {
    }

}
