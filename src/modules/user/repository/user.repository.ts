import { BaseRepository } from 'src/base/base.repository';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PrismaDatabase } from 'src/database/prisma.database';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private prisma: PrismaDatabase) {
    super(prisma.user);
  }
}
