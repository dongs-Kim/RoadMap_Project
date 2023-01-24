import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.user_id = shortUUID.generate();
    user.email = createUserDto.email;
    user.password = await hashPassword(createUserDto.password_origin);
    user.nickname = createUserDto.nickname;
    user.comment = createUserDto.comment;
    user.image = createUserDto.image;

    await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user_id: string): Promise<User> {
    return this.usersRepository.findOneBy({ user_id });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.nickname = updateUserDto.nickname;
    user.comment = updateUserDto.comment;
    user.image = updateUserDto.image;
    if (updateUserDto.password_origin) {
      user.password = await hashPassword(updateUserDto.password_origin);
    }
    return await this.usersRepository.update(user_id, updateUserDto);
  }

  async remove(user_id: string): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}

function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
