import { PickType } from '@nestjs/swagger';
import { IsStrongPassword, IsNotEmpty, MaxLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'nickname',
  'comment',
  'image',
]) {
  @IsNotEmpty()
  @MaxLength(12)
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 0,
  })
  password_origin: string;
}
