import { PassportSerializer } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class LocalSerializer extends PassportSerializer {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    serializeUser(user: User, done: CallableFunction): void;
    deserializeUser(id: string, done: CallableFunction): Promise<any>;
}
