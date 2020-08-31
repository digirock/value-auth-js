import * as rm from 'typed-rest-client/RestClient'
import {IRestResponse} from 'typed-rest-client/RestClient'
import {IRequestOptions} from "typed-rest-client/Interfaces";
import {ApiEndpoint} from "ApiEndpoint";
import {ApiInput} from "ApiInput";
import * as jwt from 'jwt-simple';

const defaultBaseUrl = "https://api-test.homestead.test/v2/";

export interface ApiClientOptions {
    authCode?: string,
    accessToken?: string,
    baseUrl?: string,
}

interface ApiClientInputParams {
    path: string,
    params?: { [name: string]: any },
    options?: rm.IRequestOptions
}

export default class ApiClient {
    protected accessToken?: string;
    protected baseUrl?: string;
    protected authCode?: string;
    public currentCustomerKey?: string;

    public constructor(options: ApiClientOptions) {
        this.authCode = options.authCode;
        this.baseUrl = options.baseUrl ?? defaultBaseUrl;
        this.accessToken = options.accessToken;
        this.parseAccessToken();
    }

    protected parseAccessToken() {
        if (this.accessToken) {
            let decoded = jwt.decode(this.accessToken, '', true)
            console.log(decoded);
            const {aud, sub} = decoded;
            this.currentCustomerKey = aud;
            this.authCode = sub;
        }
    }

    protected defaultRestClient(token: string): rm.RestClient {
        let requestOptions: IRequestOptions = {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            ignoreSslError: true,
        };
        return new rm.RestClient('value-auth-js', this.baseUrl, undefined, requestOptions)
    }

    protected apiPathFor(pathPrefix: string, pathParams?: { [name: string]: any }): string {
        let path = `${this.authCode}${pathPrefix}`;
        if (pathParams) {
            for (let key in pathParams) {
                path = path.replace(`{${key}}`, pathParams[key])
            }
        }
        return path;
    }

    protected inputParamsFor<ResultType>(input: ApiInput, endpoint: ApiEndpoint<ResultType>): ApiClientInputParams {
        let params: ApiClientInputParams = {
            path: this.apiPathFor(endpoint.path, endpoint.pathParams)
        };
        if (endpoint.queryParams) {
            let queryParams: { [name: string]: any } = {}
            let inputDict = input as { [name: string]: any };
            endpoint.queryParams.forEach(key => {
                if (inputDict[key]) {
                    queryParams[key] = inputDict[key]
                }
            })
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
        let client = this.defaultRestClient(this.accessToken!);
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
                promise = client.update<ResultType>(path, params, options);
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

