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
    findFavorite(id: string): Promise<{
        User: {
            id: string;
            email: string;
            nickname: string;
            comment?: string;
            image?: string;
            created_at: Date;
            updated_at: Date;
            Roadmaps: import("../entities/roadmap.entity").Roadmap[];
            Replies: import("../entities/reply.entity").Reply[];
            LikeRoadmaps: import("../entities/roadmap.entity").Roadmap[];
            StoredRoadmaps: import("../entities/roadmap.entity").Roadmap[];
        };
        like: number;
        reply: number;
        id: string;
        category: string;
        public: boolean;
        title: string;
        contents?: string;
        thumbnail?: string;
        bgcolor?: string;
        created_at: Date;
        updated_at: Date;
        RoadmapItems: import("../entities/roadmap_item.entity").RoadmapItem[];
        RoadmapEdges: import("../entities/roadmap_edge.entity").RoadmapEdge[];
        StoringUsers: UserEntity[];
    }[]>;
    findRoadmapByUser(id: string): Promise<{
        id: string;
        email: string;
        nickname: string;
        comment?: string;
        image?: string;
        created_at: Date;
        updated_at: Date;
        Roadmaps: import("../entities/roadmap.entity").Roadmap[];
        Replies: import("../entities/reply.entity").Reply[];
        LikeRoadmaps: import("../entities/roadmap.entity").Roadmap[];
        StoredRoadmaps: import("../entities/roadmap.entity").Roadmap[];
    }>;
    uploadProfileImage(file: Express.Multer.File, user: UserEntity): Promise<string>;
    deleteProfileImage(user: UserEntity): Promise<boolean>;
}
