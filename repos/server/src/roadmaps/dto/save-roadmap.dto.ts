import { IsDefined, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { EN_ROADMAP_ITEM_STATUS } from 'src/common/enums';
import { CreateRoadmapDto } from './create-roadmap.dto';

export class SaveRoadmapDto {
  @IsNotEmptyObject()
  roadmap: CreateRoadmapDto;

  @IsDefined()
  nodes: RoadmapNodeDto[];

  @IsDefined()
  edges: RoadmapEdgeDto[];
}

export class RoadmapNodeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmptyObject()
  position: { x: number; y: number };

  @IsNotEmpty()
  type: string;

  @IsNotEmptyObject()
  data: {
    name: string;
    description?: string;
    status?: EN_ROADMAP_ITEM_STATUS;
  };
}

export class RoadmapEdgeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  sourceHandle: string;

  @IsNotEmpty()
  target: string;
}
