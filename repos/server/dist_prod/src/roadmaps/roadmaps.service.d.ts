import { Roadmap } from 'src/entities/roadmap.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { SaveRoadmapDto } from './dto/save-roadmap.dto';
export declare class RoadmapsService {
    private roadmapsRepository;
    private usersRepository;
    private dataSource;
    constructor(roadmapsRepository: Repository<Roadmap>, usersRepository: Repository<User>, dataSource: DataSource);
    findAll(): Promise<Roadmap[]>;
    findOneSet(id: string, mode?: string, user?: User): Promise<SaveRoadmapDto>;
    findMyAll(user: User): Promise<Roadmap[]>;
    findCategory(category: string): Promise<Roadmap[]>;
    findByUser(Userid: string): Promise<Roadmap[]>;
    remove(id: string, user: User): Promise<boolean>;
    like(id: string, user: User): Promise<void>;
    unlike(roadmap_id: string, user: User): Promise<void>;
    isLike(id: string, user: User): Promise<boolean>;
    save(user: User, { roadmap, nodes, edges, isUpdate }: SaveRoadmapDto): Promise<boolean>;
    uploadThumbnail(id: string, url: string): Promise<void>;
    removeThumbnail(id: string): void;
}
