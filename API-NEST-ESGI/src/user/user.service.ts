import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  add(data: Prisma.UserCreateInput) {
    // const { name, userId, balance } = data;
    // if (!name || !userId) {
    //   throw new RpcException({
    //     code: status.INVALID_ARGUMENT,
    //     message: 'some fields are missing',
    //   });
    // }

    // if (balance < 0) {
    //   throw new RpcException({
    //     code: status.INVALID_ARGUMENT,
    //     message: 'balance must be greater than 0',
    //   });
    // }

    return this.prisma.user.create({ data });
  }
}
