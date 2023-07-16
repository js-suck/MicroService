/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user.v1";

export interface User {
  firstname?: string | undefined;
  lastname?: string | undefined;
  email?: string | undefined;
  id?: number | undefined;
}

export interface Users {
  Users?: User[] | undefined;
}

export interface Message {
  test?: string | undefined;
}

export interface NameRequest {
  name?: string | undefined;
}

export interface FindAllResponse {
  users?: User[] | undefined;
}

export interface FindByNameResponse {
  users?: User[] | undefined;
}

export interface EmptyRequest {
}

export interface GetRequest {
  name?: string | undefined;
  id?: number | undefined;
}

export interface GetResponse {
  Useres?: User[] | undefined;
}

export interface AddRequest {
  firstname?: string | undefined;
  lastname?: string | undefined;
  email?: string | undefined;
}

export interface AddResponse {
  user?: User | undefined;
}

export interface DeleteRequest {
  name?: string | undefined;
  id?: number | undefined;
}

export interface DeleteResponse {
  user?: User | undefined;
}

export interface UpdateRequest {
  name?: string | undefined;
  id?: number | undefined;
  power?: number | undefined;
  hp?: number | undefined;
}

export interface UpdateResponse {
  user?: User | undefined;
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
