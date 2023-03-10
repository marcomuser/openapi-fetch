import {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponsesObject,
  ResponseObject,
  OpenAPITSOptions,
} from "openapi-typescript";

export type Document = OpenAPI3;

export type Operation = OperationObject;

export type Parameter = ParameterObject;

export type RequestBody = RequestBodyObject;

export type Responses = ResponsesObject;

export type Response = ResponseObject;

export type OTSOptions = Partial<OpenAPITSOptions>;
