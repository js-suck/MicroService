import { BankAccount } from "bank-api/src/stubs/bankAccount/v1alpha/bankAccount";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";
import { UserService } from "./user/user.service";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async checkIfSoldCanBeUpdated(id: number, amount: number) {
    return this.prisma.bankAccount
      .findUnique({
        where: { id },
      })
      .then((account) => {
        if (!account) {
          throw new RpcException({
            code: status.NOT_FOUND,
            message: "bank account not found",
          });
        }

        const newBalance = account.balance + amount;
        if (newBalance < 0) {
          throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: "crediting the amount will result in a negative balance",
          });
        }

        return true;
      });
  }

  async add(data: Prisma.BankAccountCreateInput) {
    const { name, userId, balance } = data;

    let userExist = false;
    let hasAlreadyAccount = false;
    await this.userService.findOne(userId).then((user) => {
      if (user !== null) {
        userExist = true;
      }
    });

    this.prisma.bankAccount
      .findMany({
        where: {
          userId: userId,
        },
      })
      .then((accounts) => {
        if (accounts.length > 0) {
          hasAlreadyAccount = true;
        }
      });

    if (hasAlreadyAccount) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: "user has already an account",
      });
    }

    if (!userExist) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "user not found",
      });
    }

    if (!name || !userId) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: "some fields are missing",
      });
    }

    if (balance < 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: "balance must be greater than 0",
      });
    }

    return this.prisma.bankAccount.create({ data });
  }

  findAll(filters?: {
    order: Prisma.SortOrder;
    field: string;
  }): Prisma.PrismaPromise<BankAccount[]> {
    if (filters && filters.field && filters.order) {
      const orderBy: Prisma.BankAccountOrderByWithRelationInput = {
        [filters.field]: filters.order,
      };
      return this.prisma.bankAccount.findMany({
        orderBy,
      });
    }
    return this.prisma.bankAccount.findMany();
  }

  findOne(id: number): Prisma.PrismaPromise<BankAccount> {
    return this.prisma.bankAccount.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.BankAccountUpdateInput) {
    if (data.balance) {
      await this.checkIfSoldCanBeUpdated(id, data.balance as number);
    }

    return this.prisma.bankAccount.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.bankAccount.delete({
      where: { id },
    });
  }

  debit(id: number, amount: number): Prisma.PrismaPromise<BankAccount> {
    if (amount <= 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: "amount must be greater than 0",
      });
    }

    return this.prisma.bankAccount.update({
      where: { id },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  }

  async credit(id: number, amount: number): Promise<BankAccount> {
    if (amount <= 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: "amount must be greater than 0",
      });
    }
    const canBeUpdated = await this.checkIfSoldCanBeUpdated(id, amount);

    if (canBeUpdated) {
      return this.prisma.bankAccount.update({
        where: { id },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
    }

    return null;
  }
}
