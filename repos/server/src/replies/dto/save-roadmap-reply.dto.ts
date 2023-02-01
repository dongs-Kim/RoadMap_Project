import { IsNotEmpty } from 'class-validator';

export class SaveRoadmapReplyDto {
  @IsNotEmpty()
  roadmap_id: string;

  @IsNotEmpty()
  contents: string;
}
