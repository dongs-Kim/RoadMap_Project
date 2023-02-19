/// <reference types="multer" />
import { RoadmapsService } from './roadmaps.service';
import { User as UserEntity } from 'src/entities/user.entity';
import { SaveRoadmapDto } from './dto/save-roadmap.dto';
export declare class RoadmapsController {
    private readonly roadmapsService;
    constructor(roadmapsService: RoadmapsService);
    create(user: UserEntity, saveRoadmapDto: SaveRoadmapDto): Promise<boolean>;
    findAll(): Promise<import("../entities/roadmap.entity").Roadmap[]>;
    findMyAll(user: UserEntity): Promise<import("../entities/roadmap.entity").Roadmap[]>;
    findCategory(category: string): Promise<import("../entities/roadmap.entity").Roadmap[]>;
    findByUser(id: string): Promise<import("../entities/roadmap.entity").Roadmap[]>;
    findOne(id: string, mode?: string, user?: UserEntity): Promise<SaveRoadmapDto>;
    remove(user: UserEntity, id: string): Promise<boolean>;
    like(user: UserEntity, id: string): Promise<void>;
    unlike(user: UserEntity, id: string): Promise<void>;
    isLike(user: UserEntity, id: string): Promise<boolean>;
    uploadThumbnail(file: Express.Multer.File, id: string): Promise<string>;
}
