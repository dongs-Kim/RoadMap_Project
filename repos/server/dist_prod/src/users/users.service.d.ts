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
    findUserRoadmap(id: string): Promise<{
        id: string;
        email: string;
        nickname: string;
        comment?: string;
        image?: string;
        created_at: Date;
        updated_at: Date;
        Roadmaps: Roadmap[];
        Replies: import("../entities/reply.entity").Reply[];
        LearnResources: import("../entities/learn_resource").LearnResource[];
        LikeRoadmaps: Roadmap[];
        LikeLearnResources: import("../entities/learn_resource").LearnResource[];
        StoredRoadmaps: Roadmap[];
    }>;
    getFavoriteRoadmaps(id: string): Promise<{
        User: {
            id: string;
            email: string;
            nickname: string;
            comment?: string;
            image?: string;
            created_at: Date;
            updated_at: Date;
            Roadmaps: Roadmap[];
            Replies: import("../entities/reply.entity").Reply[];
            LearnResources: import("../entities/learn_resource").LearnResource[];
            LikeRoadmaps: Roadmap[];
            LikeLearnResources: import("../entities/learn_resource").LearnResource[];
            StoredRoadmaps: Roadmap[];
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
        contents_images?: string[];
        created_at: Date;
        updated_at: Date;
        RoadmapItems: import("../entities/roadmap_item.entity").RoadmapItem[];
        RoadmapEdges: import("../entities/roadmap_edge.entity").RoadmapEdge[];
        StoringUsers: User[];
    }[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<boolean>;
    storeRoadmap(user: User, roadmap_id: string): Promise<boolean>;
    unstoreRoadmap(user: User, roadmap_id: string): Promise<boolean>;
    isStore(user: User, roadmap_id: string): Promise<boolean>;
    uploadProfileImage(user: User, url: string): Promise<void>;
    deleteProfileImage(user: User): Promise<void>;
}
