import { Controller, UseGuards } from "@nestjs/common";
import { AppService } from "./bank.service";
import { GrpcMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";

import {
  AddRequest,
  BankAccountCRUDServiceController,
  BankAccountCRUDServiceControllerMethods,
  AddResponse,
  GetResponse,
  GetRequest,
  DeleteRequest,
  DeleteResponse,
  BankAccount,
  UpdateRequest,
  UpdateResponse,
  GetAllResponse
} from "./stubs/bankAccount/v1alpha/bankAccount";
import { Prisma } from "@prisma/client";
import { GetAllRequest } from "bank-api/src/stubs/bankAccount/v1alpha/bankAccount";
//import { GrpcAuthGuard } from "src/auth/auth.guard";

@Controller()
@BankAccountCRUDServiceControllerMethods()
export class AppController implements BankAccountCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  // here we use a middleware from Auth-API to check if user can see all bank accounts
  //@UseGuards(GrpcAuthGuard)
  async add(request: AddRequest, metadata: Metadata): Promise<AddResponse> {
    return {
      bankAccount: await this.appService.add({
        name: request?.name,
        userId: request?.userId,
        balance: request?.balance
      })
    };
  }

  //@UseGuards(GrpcAuthGuard)
  @GrpcMethod("BankAccountCRUDService", "Get")
  async get(request: GetRequest, metadata: Metadata): Promise<GetResponse> {
    return {
      bankAccount: await this.appService.findOne(request?.id)
    };
  }

  //@UseGuards(GrpcAuthGuard)
  async delete(
    request: DeleteRequest,
    metadata?: Metadata
  ): Promise<DeleteResponse> {
    let bankAccount: BankAccount;
    if (request.id) {
      bankAccount = await this.appService.delete(request.id);
      return { bankAccount };
    }
  }

  //@UseGuards(GrpcAuthGuard)
  async update(
    request: UpdateRequest,
    metadata?: Metadata
  ): Promise<UpdateResponse> {
    let bankAccount: BankAccount;
    if (request.id) {
      bankAccount = await this.appService.update(request.id, {
        name: request.name,
        userId: request.userId,
        balance: request.balance
      });
      return { bankAccount };
    }
  }

  // here we use a middleware from Auth-API to check if user can see all bank accounts
  // @UseGuards(GrpcAuthGuard)
  @GrpcMethod("BankAccountCRUDService", "GetAll")
  async getAll(
    request: GetAllRequest,
    metadata: Metadata
  ): Promise<GetAllResponse> {
    if (request?.sortFilter) {
      const filter = {
        field: request?.sortFilter.field,
        order: request?.sortFilter?.order as unknown as Prisma.SortOrder
      };

      return {
        bankAccounts: await this.appService.findAll(filter)
      };
    }

    const bankAccounts = await this.appService.findAll();
    return { bankAccounts: bankAccounts };
  }
}
