import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mapObject } from 'src/utils/mapObject';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(dto.password, saltRounds);

    try {
      const createdUser = await this.repository.create({
        name: dto.name,
        email: dto.email,
        surname: dto.surname,
        password: encryptedPassword,
      });

      return mapObject(createdUser, [
        'deleted',
        'password',
        'updatedAt',
        'createdAt',
      ]);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Sorry user has already been registred.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(error.message, error.code);
    }
  }

  async findOne(email: String) {
    try {
      return await this.repository.findOne({
        email,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
