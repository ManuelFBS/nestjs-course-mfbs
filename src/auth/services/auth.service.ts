import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(username: string, password: string) {}
}
