import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(username: string, password: string) {
    const userByUserName = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUserName) {
      const match = await bcrypt.compare(password, userByUserName.password);

      if (match) return userByUserName;
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);

      if (match) return userByEmail;
    }

    return null;
  }

  public signJWT({}: {}) {}
}
