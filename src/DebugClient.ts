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
            let promise = this.getAccessToken(options.apiKey, options.customerKey);
            if (options.initializationCallback) {
                promise.then(options.initializationCallback);
            }
        }
    }

    protected get bearerToken(): string {
        return this.apiKey;
    }

    async getAccessToken(apiKey: string, customerKey: string): Promise<ApiClient> {
        let input = <GetAccessTokenInput>{
            auth_code: this.authCode,
            customer_key: customerKey
        }
        return this.process(input, GetAccessTokenEndpoint).then(result => {
            this.accessToken = result.results.access_token;
            this.parseAccessToken();
            return this;
        })
    }
}
