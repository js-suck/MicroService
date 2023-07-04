/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user.v1";

export interface User {
  firstname?: string;
  lastname?: string;
  email?: string;
  id?: number;
}

export interface Users {
  Users?: User[];
}

export interface Message {
  test?: string;
}

export interface GetRequest {
  name?: string;
  id?: number;
}

export interface GetResponse {
  Useres?: User[];
}

export interface AddRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface AddResponse {
  user?: User;
}

export interface DeleteRequest {
  name?: string;
  id?: number;
}

export interface DeleteResponse {
  user?: User;
}

export interface UpdateRequest {
  name?: string;
  id?: number;
  power?: number;
  hp?: number;
}

export interface UpdateResponse {
  user?: User;
}

export const USER_V1_PACKAGE_NAME = "user.v1";

export interface UserCRUDServiceClient {
  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;
}

export interface UserCRUDServiceController {
  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;
}

export function UserCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add"];
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
