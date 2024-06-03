import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { mapObject } from 'src/utils/mapObject';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const createdUser = await this.repository.create({
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
    });

    return mapObject(createdUser, [
      'deleted',
      'password',
      'updatedAt',
      'createdAt',
    ]);
  }
}