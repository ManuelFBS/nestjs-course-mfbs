import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

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
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado...!',
        });
      }
      return users;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: number): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
}
