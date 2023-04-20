import { LearnResource } from 'src/entities/learn_resource';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
export declare class LearnResourceService {
    private learnResourceRepository;
    private usersRepository;
    constructor(learnResourceRepository: Repository<LearnResource>, usersRepository: Repository<User>);
    create(user: User, createLearnResourceDto: CreateLearnResourceDto): Promise<boolean>;
    getLearnResources(category?: string, keyword?: string, user_id?: string, sort?: string, sortType?: string, page?: number, pageSize?: number): Promise<{
        items: {
            like: number;
            user_id: string;
            user_nickname: string;
            id: string;
            category: string;
            name: string;
            url?: string[];
            contents?: string;
            contents_images?: string[];
            created_at: Date;
            RoadmapItems: import("../entities/roadmap_item.entity").RoadmapItem[];
            Replies: import("../entities/learn_resource_reply.entity").LearnResourceReply[];
        }[];
        totalCount: number;
    }>;
    getOne(id: string): Promise<{
        like: number;
        user_id: string;
        user_nickname: string;
        id: string;
        category: string;
        name: string;
        url?: string[];
        contents?: string;
        contents_images?: string[];
        created_at: Date;
        RoadmapItems: import("../entities/roadmap_item.entity").RoadmapItem[];
        Replies: import("../entities/learn_resource_reply.entity").LearnResourceReply[];
    }>;
    isLike(id: string, user: User): Promise<boolean>;
    like(id: string, user: User): Promise<void>;
    unlike(roadmap_id: string, user: User): Promise<void>;
    delete(id: string, user: User): Promise<boolean>;
}
