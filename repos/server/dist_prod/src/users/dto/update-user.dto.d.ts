import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Omit<Partial<CreateUserDto>, "email" | "password_origin">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
