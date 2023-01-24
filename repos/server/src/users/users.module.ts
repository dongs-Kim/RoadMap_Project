import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/entities/user.entity';
import { Roadmap } from 'src/entities/roadmap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Roadmap])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
