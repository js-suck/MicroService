import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AUTH_V1ALPHA_PACKAGE_NAME } from "bank-api/src/stubs/auth/v1alpha/message";
import { authGrpcOptions } from "../config/grpc.option";
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: AUTH_V1ALPHA_PACKAGE_NAME,
        useFactory: (cs: ConfigService) => authGrpcOptions(cs),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
