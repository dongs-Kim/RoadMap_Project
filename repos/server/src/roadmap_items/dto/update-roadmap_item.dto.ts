import { PartialType } from '@nestjs/swagger';
import { CreateRoadmapItemDto } from './create-roadmap_item.dto';

export class UpdateRoadmapItemDto extends PartialType(CreateRoadmapItemDto) {}
