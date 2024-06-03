import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PrismaDatabase } from './database/prisma.database';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
