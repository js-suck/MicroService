/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "bank.v1";

export enum SortOrder {
  asc = 0,
  desc = 1,
  UNRECOGNIZED = -1,
}

export interface BankAccount {
  name?: string | undefined;
  id?: number | undefined;
  userId?: number | undefined;
  balance?: number | undefined;
}

export interface BankAccounts {
  bankAccounts?: BankAccount[] | undefined;
}

export interface SortFilter {
  field?: string | undefined;
  order?: SortOrder | undefined;
}

export interface Message {
  test?: string | undefined;
}

export interface GetRequest {
  name?: string | undefined;
  id?: number | undefined;
}

export interface GetResponse {
  bankAccount?: BankAccount | undefined;
}

export interface GetAllRequest {
  sortFilter?: SortFilter | undefined;
}

export interface GetAllResponse {
  bankAccounts?: BankAccounts | undefined;
}

export interface AddRequest {
  name?: string | undefined;
  userId?: number | undefined;
  balance?: number | undefined;
}

export interface AddResponse {
  bankAccount?: BankAccount | undefined;
}

export interface DeleteRequest {
  name?: string | undefined;
  id?: number | undefined;
}

export interface DeleteResponse {
  bankAccount?: BankAccount | undefined;
}

export interface UpdateRequest {
  name?: string | undefined;
  id?: number | undefined;
  userId?: number | undefined;
  balance?: number | undefined;
}

export interface UpdateResponse {
  bankAccount?: BankAccount | undefined;
}

export const BANK_V1_PACKAGE_NAME = "bank.v1";

/** this is the file where we define type and stubs will be generated. */

export interface BankAccountCRUDServiceClient {
  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  getAll(request: GetAllRequest, metadata?: Metadata): Observable<GetAllResponse>;
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

  getAll(
    request: GetAllRequest,
    metadata?: Metadata,
  ): Promise<GetAllResponse> | Observable<GetAllResponse> | GetAllResponse;
}

export function BankAccountCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add", "get", "delete", "update", "getAll"];
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
