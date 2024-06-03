import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants/constants';
import { AuthDto } from './dto/auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() auth: AuthDto) {
    try {
      return await this.authService.signIn(auth.email, auth.password);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
