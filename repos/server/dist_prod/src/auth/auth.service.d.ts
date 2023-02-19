import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    validateUser(email: string, password: string): Promise<any>;
}
