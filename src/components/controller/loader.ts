import { Callback, Endpoint, HttpMethod, QueryOptions, RequestOptions, RequestParams, StatusCode } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<RequestOptions>;

    constructor(baseLink: string, options: Pick<QueryOptions, 'apiKey'>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as (keyof RequestOptions)[]).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: HttpMethod, endpoint: Endpoint, callback: Callback<T>, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
