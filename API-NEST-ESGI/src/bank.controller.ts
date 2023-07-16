import { Controller } from "@nestjs/common";
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
  GetAllResponse,
} from "./stubs/bankAccount/v1alpha/bankAccount";
import { Prisma } from "@prisma/client";
import { GetAllRequest } from "bank-api/src/stubs/bankAccount/v1alpha/bankAccount";

@Controller()
@BankAccountCRUDServiceControllerMethods()
export class AppController implements BankAccountCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  async add(request: AddRequest, metadata: Metadata): Promise<AddResponse> {
    return {
      bankAccount: await this.appService.add({
        name: request?.name,
        userId: request?.userId,
        balance: request?.balance,
      }),
    };
  }

  @GrpcMethod("BankAccountCRUDService", "Get")
  async get(request: GetRequest, metadata: Metadata): Promise<GetResponse> {
    return {
      bankAccount: await this.appService.findOne(request?.id),
    };
  }

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

  async update(
    request: UpdateRequest,
    metadata?: Metadata
  ): Promise<UpdateResponse> {
    let bankAccount: BankAccount;
    if (request.id) {
      bankAccount = await this.appService.update(request.id, {
        name: request.name,
        userId: request.userId,
        balance: request.balance,
      });
      return { bankAccount };
    }
  }

  @GrpcMethod("BankAccountCRUDService", "FindAll")
  async findAll(
    request: GetAllRequest,
    metadata: Metadata
  ): Promise<GetAllResponse> {
    if (request?.sortFilter) {
      const filter = {
        field: request?.sortFilter.field,
        order: request?.sortFilter?.order as unknown as Prisma.SortOrder,
      };

      return {
        bankAccounts: await this.appService.findAll(filter),
      };
    }

    const bankAccounts = await this.appService.findAll();
    return { bankAccounts: bankAccounts };
  }
}
