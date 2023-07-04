/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bank.v1";

export interface BankAccount {
  name?: string;
  id?: number;
  userId?: number;
  balance?: number;
}

export interface BankAccounts {
  bankAccounts?: BankAccount[];
}

export interface Message {
  test?: string;
}

export interface GetRequest {
  name?: string;
  id?: number;
}

export interface GetResponse {
  bankAccount?: BankAccount;
}

export interface GetAllResponse {
  bankAccounts?: BankAccounts;
}

export interface AddRequest {
  name?: string;
  userId?: number;
  balance?: number;
}

export interface AddResponse {
  bankAccount?: BankAccount;
}

export interface DeleteRequest {
  name?: string;
  id?: number;
}

export interface DeleteResponse {
  bankAccount?: BankAccount;
}

export interface UpdateRequest {
  name?: string;
  id?: number;
  userId?: number;
  balance?: number;
}

export interface UpdateResponse {
  bankAccount?: BankAccount;
}

export const BANK_V1_PACKAGE_NAME = "bank.v1";

/** this is the file where we define type and stubs will be generated. */

export interface BankAccountCRUDServiceClient {
  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;
}

/** this is the file where we define type and stubs will be generated. */

export interface BankAccountCRUDServiceController {
  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;
}

export function BankAccountCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add", "get", "delete", "update"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BankAccountCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BankAccountCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BANK_ACCOUNT_CR_UD_SERVICE_NAME = "BankAccountCRUDService";
