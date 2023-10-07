import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      const lastUser: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .orderBy('user.id', 'DESC')
        .getOne();

      let initialId = 1001;

      if (lastUser) {
        initialId = lastUser.id + 1;
      }

      const newUser = new UsersEntity();

      newUser.id = initialId;
      newUser.firstName = body.firstName;
      newUser.lastName = body.lastName;
      newUser.age = body.age;
      newUser.email = body.email;
      newUser.username = body.username;
      newUser.password = body.password;
      newUser.role = body.role;

      const user = await this.userRepository.save(newUser);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
