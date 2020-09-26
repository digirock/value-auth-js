import * as rm from 'typed-rest-client/RestClient'
import {IRestResponse} from 'typed-rest-client/RestClient'
import {IRequestOptions} from "typed-rest-client/Interfaces";
import {ApiAuthentication, ApiEndpoint} from './ApiEndpoint';
import {AccessTokenRole, ApiInput} from './ApiInput';
import * as jwt from 'jwt-simple';

export interface ApiClientOptions {
    accessToken?: string,
    baseUrl?: string,
    xdebug?: string,
    initializationCallback?: (value: ApiClient) => ApiClient;
    role: AccessTokenRole,
    debug?: boolean
}

interface ApiClientInputParams {
    path: string,
    params?: { [name: string]: any },
    options?: rm.IRequestOptions
}

export class ApiClient {
    public accessToken?: string;
    public baseUrl?: string;
    public currentCustomerKey?: string;
    public xdebug?: string;
    public initializationCallback?: (value: ApiClient) => ApiClient;
    public currentRole?: AccessTokenRole;
    public debug: boolean = false;

    public constructor(options: ApiClientOptions) {
        this.baseUrl = options.baseUrl;
        this.accessToken = options.accessToken;
        this.parseAccessToken();
        this.xdebug = options.xdebug;
        this.initializationCallback = options.initializationCallback;
        this.debug = options.debug ?? false;
    }

    protected parseAccessToken() {
        if (this.accessToken) {
            let decoded = jwt.decode(this.accessToken, '', true)
            const {aud, role} = decoded;
            this.currentCustomerKey = aud;
            this.currentRole = role;
        }
    }

    protected get apiKey(): string | undefined {
        return undefined;
    }

    protected get authCode(): string | undefined {
        return undefined;
    }

    protected bearerToken<T>(endpoint: ApiEndpoint<T>): string {
        if (endpoint.authentication) {
            switch (endpoint.authentication) {
                case ApiAuthentication.ApiKey:
                    if (!this.apiKey) {
                        throw new Error("API key is not set");
                    }
                    return this.apiKey;
                case ApiAuthentication.AccessToken:
                    if (!this.accessToken) {
                        throw new Error("Access token is not set.");
                    }
                    return this.accessToken;
            }
        } else {
            if (!this.accessToken) {
                throw new Error("Access token is not set.");
            }
            return this.accessToken;
        }
    }


    protected defaultRestClient<T>(endpoint: ApiEndpoint<T>): rm.RestClient {
        let requestOptions: IRequestOptions = {
            headers: {
                "Authorization": `Bearer ${this.bearerToken(endpoint)}`
            },
            ignoreSslError: this.debug,
        };
        return new rm.RestClient('value-auth-js', this.baseUrl, undefined, requestOptions)
    }

    protected apiPathFor(pathPrefix: string, input?: { [name: string]: any }, pathParams?: string[],): string {
        let path = pathPrefix;
        let inputDict: {[name: string]: any}|undefined = input;
        if (this.authCode && inputDict) {
            inputDict['auth_code'] = this.authCode;
        }
        if (input && pathParams) {
            pathParams.forEach(key => {
                path = path.replace(`{${key}}`, input[key])
            });
        }
        return path;
    }

    protected inputParamsFor<ResultType>(input: ApiInput, endpoint: ApiEndpoint<ResultType>): ApiClientInputParams {
        let params: ApiClientInputParams = {
            path: this.apiPathFor('/v2' + endpoint.path, input, endpoint.pathParams)
        };
        let inputDict: {[name: string]: any} = input;
        if (this.authCode) {
            inputDict['auth_code'] = this.authCode;
        }
        if (endpoint.queryParams) {
            let queryParams: { [name: string]: any } = {}
            endpoint.queryParams.forEach(key => {
                if (inputDict[key]) {
                    queryParams[key] = inputDict[key]
                }
            })
            if (this.xdebug) {
                queryParams['XDEBUG_SESSION_START'] = this.xdebug;
            }
            params.options = {
                queryParameters: {
                    params: queryParams
                }

            }
        }
        if (endpoint.bodyParams) {
            let bodyParams: { [name: string]: any } = {}
            endpoint.bodyParams.forEach(key => {
                if (inputDict[key]) {
                    bodyParams[key] = inputDict[key]
                }
            })
            params.params = bodyParams;
        }
        return params;
    }

    protected authenticationGuard<T>(endpoint: ApiEndpoint<T>) {
        if (endpoint.authentication == ApiAuthentication.ApiKey) {
            throw new Error("Cannot call API that requires API Key");
        }
    }

    public async process<ResultType>(input: ApiInput, endpoint: ApiEndpoint<ResultType>):
        Promise<ResultType> {
        this.authenticationGuard(endpoint);
        let client = this.defaultRestClient(endpoint);
        let promise: Promise<IRestResponse<ResultType>>;
        let {path, params, options} = this.inputParamsFor(input, endpoint);
        switch (endpoint.method) {
            case 'get':
                promise = client.get<ResultType>(path, options);
                break;
            case 'post':
                promise = client.create<ResultType>(path, params, options);
                break;
            case 'put':
                promise = client.replace<ResultType>(path, params, options);
                break;
            case 'delete':
                promise = client.del<ResultType>(path, options);
                break;
        }
        return promise!.then(response => {
            return response.result!;
        });
    }
}

