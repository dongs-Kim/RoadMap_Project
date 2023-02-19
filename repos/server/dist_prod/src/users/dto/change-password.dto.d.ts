import { CreateUserDto } from './create-user.dto';
declare const ChangePasswordDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "password_origin">>;
export declare class ChangePasswordDto extends ChangePasswordDto_base {
    password_prev: string;
}
export {};
