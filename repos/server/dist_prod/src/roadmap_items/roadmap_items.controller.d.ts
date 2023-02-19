import { RoadmapItemsService } from './roadmap_items.service';
import { CreateRoadmapItemDto } from './dto/create-roadmap_item.dto';
import { UpdateRoadmapItemDto } from './dto/update-roadmap_item.dto';
export declare class RoadmapItemsController {
    private readonly roadmapItemsService;
    constructor(roadmapItemsService: RoadmapItemsService);
    create(createRoadmapItemDto: CreateRoadmapItemDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRoadmapItemDto: UpdateRoadmapItemDto): string;
    remove(id: string): string;
}
