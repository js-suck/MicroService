/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "user.v1alpha";

export enum UserRole {
  USER_ROLE_BASIC = 0,
  USER_ROLE_ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface RegisterRequest {
  password?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
}

export interface User {
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  createdAt?: Timestamp | undefined;
  updatedAt?: Timestamp | undefined;
  role?: UserRole | undefined;
}

export interface RegisterResponse {
  user?: User | undefined;
}

export interface UpdateRequest {
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface UpdateResponse {
  user?: User | undefined;
}

export interface DeleteRequest {
  id?: string | undefined;
}

export interface DeleteResponse {
  user?: User | undefined;
}

export interface UpdatePasswordRequest {
  id?: string | undefined;
  password?: string | undefined;
}

export interface UpdatePasswordResponse {
  user?: User | undefined;
}

export interface FindRequest {
  id?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
}

export interface FindResponse {
  user?: User[] | undefined;
}

export interface CheckPasswordRequest {
  email?: string | undefined;
  password?: string | undefined;
}

export interface CheckPasswordResponse {
  status?: CheckPasswordResponse_STATUS | undefined;
  user?: User | undefined;
}

export enum CheckPasswordResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface MakeAdminRequest {
  id?: string | undefined;
  email?: string | undefined;
}

export interface MakeAdminResponse {
  user?: User | undefined;
}

export const USER_V1ALPHA_PACKAGE_NAME = "user.v1alpha";

export interface UserServiceClient {
  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  checkPassword(request: CheckPasswordRequest, metadata?: Metadata): Observable<CheckPasswordResponse>;

  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  updatePassword(request: UpdatePasswordRequest, metadata?: Metadata): Observable<UpdatePasswordResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  makeAdmin(request: MakeAdminRequest, metadata?: Metadata): Observable<MakeAdminResponse>;
}

export interface UserServiceController {
  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  checkPassword(
    request: CheckPasswordRequest,
    metadata?: Metadata,
  ): Promise<CheckPasswordResponse> | Observable<CheckPasswordResponse> | CheckPasswordResponse;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  updatePassword(
    request: UpdatePasswordRequest,
    metadata?: Metadata,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  makeAdmin(
    request: MakeAdminRequest,
    metadata?: Metadata,
  ): Promise<MakeAdminResponse> | Observable<MakeAdminResponse> | MakeAdminResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "find",
      "checkPassword",
      "register",
      "update",
      "updatePassword",
      "delete",
      "makeAdmin",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
