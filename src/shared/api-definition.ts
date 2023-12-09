export enum HttpMethod {
	ALL = 'all',
	GET = 'get',
	DELETE = 'delete',
	POST = 'post',
	PUT = 'put',
	PATCH = 'patch',
	OPTIONS = 'options',
	HEAD = 'head',
}

export type HttpMethod_Query = HttpMethod.GET | HttpMethod.DELETE;
export type HttpMethod_Body = HttpMethod.POST | HttpMethod.PUT | HttpMethod.PATCH;
export type HttpMethod_Empty = HttpMethod.OPTIONS | HttpMethod.HEAD;

export const httpMethods_Query = [HttpMethod.GET, HttpMethod.DELETE];
export const httpMethods_Body = [HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH];

export type QueryParams = { [k: string]: string | number | undefined }

export type Cosmo_API<Method extends HttpMethod, Body, Params extends QueryParams | undefined, Response> = {
	method: Method,
	body: Body,
	params: Params,
	response: Response,
};

export type Cosmo_QueryAPI<Response, Params extends QueryParams | undefined = QueryParams, Method extends HttpMethod_Query = HttpMethod.GET> =
	Cosmo_API<Method, never, Params, Response>;

export type Cosmo_BodyAPI<Response, Body, Method extends HttpMethod_Body = HttpMethod.POST> =
	Cosmo_API<Method, Body, never, Response>;

export type Cosmo_EmptyAPI<Response, Method extends HttpMethod_Empty = HttpMethod.OPTIONS> =
	Cosmo_API<Method, never, never, Response>;

export type Cosmo_APIDefinition<API extends Cosmo_API<any, any, any, any>> = {
	method: API['method'];
	path: string;
}

export const cosmo_APIDefKeys: (keyof Cosmo_APIDefinition<any>)[] = ['method', 'path'];

export type Cosmo_APIStructure = { [k: string]: (Cosmo_APIDefinition<any> | Cosmo_APIStructure) };