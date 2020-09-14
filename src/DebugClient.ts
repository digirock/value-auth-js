import ApiClient, {ApiClientOptions} from "@/client/ApiClient";
import {GetAccessTokenInput} from "@/client/ApiInput";
import {GetAccessTokenEndpoint} from "@/client/ApiEndpoint";

export interface DebugClientOptions extends ApiClientOptions {
    authCode: string,
    apiKey: string,
    customerKey: string,
}

export default class DebugClient extends ApiClient {
    protected authCode: string;
    protected apiKey: string;


    constructor(options: DebugClientOptions) {
        super(options);
        this.authCode = options.authCode;
        this.apiKey = options.apiKey;

        if (!this.accessToken) {
            let _ = this.fetchAccessToken(options.customerKey, options.role);
        }
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

    protected get bearerToken(): string {
        if (this.accessToken) {
            return this.accessToken;
        } else {
            return this.apiKey;
        }
    }

}
