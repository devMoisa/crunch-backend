import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create')
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.service.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
