import 'winston-daily-rotate-file';

import { fastifyCookie } from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { WinstonModule } from 'nest-winston';

import { HttpExceptionFilter } from '@/app/http-exception.filter';
import { TransformInterceptor } from '@/app/transform.interceptor';
import CSPConfig from '@/config/csp';
import { MasterModule } from '@/master.module';
import { createLogger } from '@/utils/logger';

// Bootstrap the application and configure
export async function Bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MasterModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({
        instance: createLogger(),
      }),
    },
  );
  const config = app.get(ConfigService<EnvironmentVariables>);

  // Cookie parser
  await app.register(fastifyCookie, {
    secret: config.get('COOKIE_TOKEN', null),
  });
  // CORS
  app.enableCors({ credentials: true, origin: true });
  // Security
  await app.register(helmet, {
    contentSecurityPolicy: CSPConfig,
  });
  // Global parameters validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const logger = app.get(Logger);
  // Global error filter
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  // Global interceptor
  app.useGlobalInterceptors(new TransformInterceptor(logger));

  // Global version prefix
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(config.get('PORT', 3000), '0.0.0.0');
}
