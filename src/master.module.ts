import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppModule } from './app/app.module';

// Entry point for all modules, Used to handle all public injections
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, './config/.env')],
    }),
    AppModule,
  ],
})
export class MasterModule {}
