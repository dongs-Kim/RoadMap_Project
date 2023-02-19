import { User } from 'src/entities/user.entity';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<User, "image" | "email" | "nickname" | "comment">>;
export declare class CreateUserDto extends CreateUserDto_base {
    password_origin: string;
}
export {};
