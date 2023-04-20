import { User as UserEntity } from 'src/entities/user.entity';
import { LearnResourceService } from './learn_resource.service';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
export declare class LearnResourceController {
    private readonly learnResourceService;
    constructor(learnResourceService: LearnResourceService);
    create(user: UserEntity, createLearnResourceDto: CreateLearnResourceDto): Promise<boolean>;
    getList(category: string, keyword: string, user_id: string, sort: string, sortType: string, page: number, pageSize: number): Promise<{
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
    isLike(user: UserEntity, id: string): Promise<boolean>;
    like(user: UserEntity, id: string): Promise<void>;
    unlike(user: UserEntity, id: string): Promise<void>;
    delete(user: UserEntity, id: string): Promise<boolean>;
}
