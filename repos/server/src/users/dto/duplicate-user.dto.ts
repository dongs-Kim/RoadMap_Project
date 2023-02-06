import { PickType } from '@nestjs/swagger';
import { IsStrongPassword, IsNotEmpty, MaxLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class DuplicateUserDto {
  email: string;
}
