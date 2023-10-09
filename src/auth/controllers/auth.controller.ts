import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthBody) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) throw new UnauthorizedException('Data not valid');

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
