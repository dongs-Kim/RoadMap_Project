import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail({
        where: { id },
      })
      .then((user) => {
        const { password, ...result } = user;
        done(null, result);
      })
      .catch((error) => done(error));
  }
}
