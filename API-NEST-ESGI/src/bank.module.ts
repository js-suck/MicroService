import { Module } from "@nestjs/common";
import { AppController } from "./bank.controller";
import { AppService } from "./bank.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";
import { AuthModule } from "../auth/auth.module";
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
