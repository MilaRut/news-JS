export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum StatusCode {
    Unauthorized = 401,
    NotFound = 404,
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface QueryOptions {
    apiKey: string;
    sources: string;
}

export type RequestOptions = Partial<QueryOptions>;

export interface RequestParams {
    endpoint: Endpoint;
    options?: RequestOptions;
}

export type Callback<T> = (data: T) => void;

export type ResponseStatus = 'ok' | 'error';

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ResponseStatus;
    sources: Source[];
}

export interface NewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}
