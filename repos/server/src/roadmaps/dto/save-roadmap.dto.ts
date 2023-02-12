import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';
import {
  EN_ROADMAP_ITEM_REQUIRED,
  EN_ROADMAP_ITEM_STATUS,
} from 'src/common/enums';
import { User } from 'src/entities/user.entity';
import { CreateRoadmapDto } from './create-roadmap.dto';

export class SaveRoadmapDto {
  @IsNotEmptyObject()
  roadmap: CreateRoadmapDto;

  @IsDefined()
  nodes: RoadmapNodeDto[];

  @IsDefined()
  edges: RoadmapEdgeDto[];

  @IsDefined()
  isUpdate: boolean;

  user?: User;
}

export class RoadmapNodeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmptyObject()
  position: { x: number; y: number };

  @IsNotEmpty()
  type: string;

  @IsNumber()
  zIndex: number;

  width?: number;

  height?: number;

  @IsNotEmptyObject()
  data: {
    name: string;
    description?: string;
    status?: EN_ROADMAP_ITEM_STATUS;
    bgcolor: string;
    border: boolean;
    url?: string;
    required?: EN_ROADMAP_ITEM_REQUIRED;
  };
}

export class RoadmapEdgeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  sourceHandle: string;

  @IsNotEmpty()
  target: string;

  @IsNotEmptyObject()
  data: {
    color: string;
    lineType: string;
  };
}
