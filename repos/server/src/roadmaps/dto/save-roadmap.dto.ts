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
import { LearnResource } from 'src/entities/learn_resource';

export class SaveRoadmapDto {
  @IsNotEmptyObject()
  roadmap: CreateRoadmapDto;

  @IsDefined()
  nodes: RoadmapNodeDto[];

  @IsDefined()
  edges: RoadmapEdgeDto[];

  @IsDefined()
  mode: 'new' | 'copy' | 'modify';

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
    category?: string;
    description?: string;
    status?: EN_ROADMAP_ITEM_STATUS;
    bgcolor: string;
    border: boolean;
    url?: string;
    required?: EN_ROADMAP_ITEM_REQUIRED;
    learnResources?: LearnResource[];
    temp_images?: string[];
    contents_images?: string[];
    bold?: boolean;
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
