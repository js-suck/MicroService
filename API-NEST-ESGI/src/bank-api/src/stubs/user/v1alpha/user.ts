/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user.v1";

export interface NameRequest {
  firstname?: string | undefined;
  lastname?: string | undefined;
}

export interface AddRequest {
  data?: User | undefined;
}

export interface AddResponse {
  user?: User | undefined;
}

export interface GetRequest {
  id?: number | undefined;
}

export interface GetResponse {
  user?: User | undefined;
}

export interface UpdateRequest {
  id?: number | undefined;
  data?: User | undefined;
}

export interface UpdateResponse {
  user?: User | undefined;
}

export interface DeleteRequest {
  id?: number | undefined;
}

export interface DeleteResponse {
  user?: User | undefined;
}

export interface EmptyRequest {
}

export interface FindAllResponse {
  users?: User[] | undefined;
}

export interface NameFilter {
  name?: string | undefined;
  mode?: NameFilter_Mode | undefined;
}

export enum NameFilter_Mode {
  CONTAINS = 0,
  STARTS_WITH = 1,
  ENDS_WITH = 2,
  UNRECOGNIZED = -1,
}

export interface FindByNameRequest {
  filter?: NameFilter | undefined;
}

export interface FindByNameResponse {
  users?: User[] | undefined;
}

export interface User {
  firstname?: string | undefined;
  lastname?: string | undefined;
  email?: string | undefined;
  id?: number | undefined;
  role?: number | undefined;
}

export const USER_V1_PACKAGE_NAME = "user.v1";

export interface UserCRUDServiceClient {
  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  findOne(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  findAll(request: EmptyRequest, metadata?: Metadata): Observable<FindAllResponse>;

  findByName(request: NameRequest, metadata?: Metadata): Observable<FindByNameResponse>;
}

export interface UserCRUDServiceController {
  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  findOne(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  findAll(
    request: EmptyRequest,
    metadata?: Metadata,
  ): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  findByName(
    request: NameRequest,
    metadata?: Metadata,
  ): Promise<FindByNameResponse> | Observable<FindByNameResponse> | FindByNameResponse;
}

export function UserCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add", "findOne", "update", "delete", "findAll", "findByName"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_CR_UD_SERVICE_NAME = "UserCRUDService";
