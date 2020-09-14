import * as rm from 'typed-rest-client/RestClient'
import {IRestResponse} from 'typed-rest-client/RestClient'
import {IRequestOptions} from "typed-rest-client/Interfaces";
import {ApiEndpoint} from "@/client/ApiEndpoint";
import {ApiInput} from "@/client/ApiInput";
import * as jwt from 'jwt-simple';

const defaultBaseUrl = "https://api-test.homestead.test/";

export interface ApiClientOptions {
    accessToken?: string,
    baseUrl?: string,
    xdebug?: string,
    initializationCallback?: (value: ApiClient) => ApiClient;
    role: string,
}

interface ApiClientInputParams {
    path: string,
    params?: { [name: string]: any },
    options?: rm.IRequestOptions
}

export default class ApiClient {
    public accessToken?: string;
    protected baseUrl?: string;
    public currentCustomerKey?: string;
    protected xdebug?: string;
    protected initializationCallback?: (value: ApiClient) => ApiClient;

    public constructor(options: ApiClientOptions) {
        this.baseUrl = options.baseUrl ?? defaultBaseUrl;
        this.accessToken = options.accessToken;
        this.parseAccessToken();
        this.xdebug = options.xdebug;
        this.initializationCallback = options.initializationCallback;
    }

    protected parseAccessToken() {
        if (this.accessToken) {
            let decoded = jwt.decode(this.accessToken, '', true)
            const {aud} = decoded;
            this.currentCustomerKey = aud;
        }
    }

    protected get bearerToken(): string {
        return this.accessToken!;
    }

    protected defaultRestClient(): rm.RestClient {
        let requestOptions: IRequestOptions = {
            headers: {
                "Authorization": `Bearer ${this.bearerToken}`
            },
            ignoreSslError: true,
        };
        return new rm.RestClient('value-auth-js', this.baseUrl, undefined, requestOptions)
    }

    protected apiPathFor(pathPrefix: string, input?: { [name: string]: any }, pathParams?: string[],): string {
        let path = pathPrefix;
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
        if (endpoint.queryParams) {
            let queryParams: { [name: string]: any } = {}
            let inputDict = input as { [name: string]: any };
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
            let inputDict = input as { [name: string]: any };
            endpoint.bodyParams.forEach(key => {
                if (inputDict[key]) {
                    bodyParams[key] = inputDict[key]
                }
            })
            params.params = bodyParams;
        }
        return params;
    }

    public async process<ResultType>(input: ApiInput, endpoint: ApiEndpoint<ResultType>):
        Promise<ResultType> {
        let client = this.defaultRestClient();
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

