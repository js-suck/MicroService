import { Module } from "@nestjs/common";
import { AppController } from "./bank.controller";
import { AppService } from "./bank.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";
import { AuthModule } from "./auth/auth.module";
import { GrpcReflectionModule } from "nestjs-grpc-reflection";
import { ConfigModule, ConfigService } from "@nestjs/config";
import grpcOption from "./config/grpc.option";
import * as Joi from "joi";

const envSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  PORT: Joi.string().default(4002),
  HEALTH_PORT: Joi.number().default(3000),
  insecure: Joi.boolean().required(),
  TASK_CERT: Joi.string().when("insecure", {
    is: false,
    then: Joi.required(),
  }),
  TASK_KEY: Joi.string().when("insecure", {
    is: false,
    then: Joi.required(),
  }),
  ROOT_CA: Joi.string().when("insecure", {
    is: false,
    then: Joi.required(),
  }),
  JAEGER_URL: Joi.string().required(),
  AUTH_API_URL: Joi.string().required(),
});

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === "production",
      validationSchema: envSchema,
      isGlobal: true,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, ConfigService],
})
export class AppModule {}
