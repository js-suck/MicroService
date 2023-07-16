import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './bank.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3002',
        package: 'bank.v1',
        protoPath: join(
          __dirname,
          './../proto/bankAccount/v1alpha/bankAccount.proto',
        ),
      },
    },
  );

  const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3001',
        package: 'user.v1',
        protoPath: join(__dirname, './../proto/user/v1alpha/user.proto'),
      },
    },
  );

  await Promise.all([app1.listen(), app2.listen()]);
}

bootstrap();
