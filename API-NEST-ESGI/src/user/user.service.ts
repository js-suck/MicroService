import { User } from "./../stubs/user/v1alpha/user";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

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

  findOne(id: number): Prisma.PrismaPromise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.UserUpdateInput): Prisma.PrismaPromise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Prisma.PrismaPromise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  findAll(): Prisma.PrismaPromise<User[]> {
    return this.prisma.user.findMany();
  }

  findByName(name: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { firstname: { contains: name } },
          { lastname: { contains: name } },
        ],
      },
    });
  }
}
