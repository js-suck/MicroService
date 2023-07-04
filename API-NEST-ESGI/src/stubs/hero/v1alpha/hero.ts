/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero.v1";

export interface Hero {
  name?: string;
  id?: number;
  power?: number;
  hp?: number;
}

export interface Heros {
  heros?: Hero[];
}

export interface Message {
  test?: string;
}

export interface GetRequest {
  name?: string;
  id?: number;
}

export interface GetResponse {
  heroes?: Hero[];
}

export interface AddRequest {
  name?: string;
  power?: number;
  hp?: number;
}

export interface AddResponse {
  hero?: Hero;
}

export interface DeleteRequest {
  name?: string;
  id?: number;
}

export interface DeleteResponse {
  hero?: Hero;
}

export interface UpdateRequest {
  name?: string;
  id?: number;
  power?: number;
  hp?: number;
}

export interface UpdateResponse {
  hero?: Hero;
}

export const HERO_V1_PACKAGE_NAME = "hero.v1";

export interface HeroCRUDServiceClient {
  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;
}

export interface HeroCRUDServiceController {
  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;
}

export function HeroCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_CR_UD_SERVICE_NAME = "HeroCRUDService";
