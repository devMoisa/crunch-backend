import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaDatabase } from 'src/database/prisma.database';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaDatabase, UserRepository],
})
export class UserModule {}
