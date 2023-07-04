import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { BankAccount } from './stubs/bankAccount/v1alpha/bankAccount';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  add(data: Prisma.BankAccountCreateInput) {
    const { name, userId, balance } = data;
    if (!name || !userId) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'some fields are missing',
      });
    }

    if (balance < 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'balance must be greater than 0',
      });
    }

    return this.prisma.bankAccount.create({ data });
  }

  findAll(): Prisma.PrismaPromise<BankAccount[]> {
    return this.prisma.bankAccount.findMany();
  }

  findOne(id: number): Prisma.PrismaPromise<BankAccount> {
    return this.prisma.bankAccount.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.BankAccountUpdateInput) {
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
}
