import { IsNotEmpty } from 'class-validator';

export class StoreRoadmapDto {
  @IsNotEmpty()
  roadmap_id: string;
}
