import { RoadmapItem } from 'src/entities/roadmap_item.entity';
import { Repository } from 'typeorm';
import { CreateRoadmapItemDto } from './dto/create-roadmap_item.dto';
import { UpdateRoadmapItemDto } from './dto/update-roadmap_item.dto';
export declare class RoadmapItemsService {
    private roadmapItemsRepository;
    constructor(roadmapItemsRepository: Repository<RoadmapItem>);
    create(createRoadmapItemDto: CreateRoadmapItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRoadmapItemDto: UpdateRoadmapItemDto): string;
    remove(id: number): string;
}
