import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roadmap } from 'src/entities/roadmap.entity';
export declare class UsersService {
    private usersRepository;
    private roadmapsRepository;
    constructor(usersRepository: Repository<User>, roadmapsRepository: Repository<Roadmap>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findEmail(email: string): Promise<User>;
    findUserRoadmap(id: string): Promise<User>;
    getFavoriteRoadmaps(id: string): Promise<Roadmap[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<boolean>;
    storeRoadmap(user: User, roadmap_id: string): Promise<boolean>;
    unstoreRoadmap(user: User, roadmap_id: string): Promise<boolean>;
    isStore(user: User, roadmap_id: string): Promise<boolean>;
    uploadProfileImage(user: User, url: string): Promise<void>;
    deleteProfileImage(user: User): Promise<void>;
}
