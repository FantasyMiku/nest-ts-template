import { Logger, Module } from '@nestjs/common';

// AppModule is the root module of the application
@Module({
  providers: [Logger],
})
export class AppModule {}
