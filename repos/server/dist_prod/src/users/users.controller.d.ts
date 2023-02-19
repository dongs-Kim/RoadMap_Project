/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User as UserEntity } from 'src/entities/user.entity';
import { StoreRoadmapDto } from './dto/store-roadmap.dto';
import { DuplicateUserDto } from './dto/duplicate-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(user: UserEntity): Promise<UserEntity>;
    logout(req: any, res: any): void;
    create(createUserDto: CreateUserDto, req: any): Promise<boolean>;
    getUser(user: UserEntity): UserEntity;
    getDuplicateID(DuplicateUserDto: DuplicateUserDto): Promise<UserEntity>;
    update(user: UserEntity, updateUserDto: UpdateUserDto): Promise<boolean>;
    remove(user: UserEntity): Promise<boolean>;
    changePassword(user: UserEntity, changePasswordDto: ChangePasswordDto): Promise<boolean>;
    storeRoadmap(user: UserEntity, storeRoadmapDto: StoreRoadmapDto): Promise<boolean>;
    unstoreRoadmap(user: UserEntity, storeRoadmapDto: StoreRoadmapDto): Promise<boolean>;
    isStore(user: UserEntity, roadmap_id: string): Promise<boolean>;
    findFavorite(id: string): Promise<import("../entities/roadmap.entity").Roadmap[]>;
    findRoadmapByUser(id: string): Promise<UserEntity>;
    uploadProfileImage(file: Express.Multer.File, user: UserEntity): Promise<string>;
    deleteProfileImage(user: UserEntity): Promise<boolean>;
}
