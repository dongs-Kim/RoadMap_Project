import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password_origin',
]) {
  @IsNotEmpty()
  password_prev: string;
}
