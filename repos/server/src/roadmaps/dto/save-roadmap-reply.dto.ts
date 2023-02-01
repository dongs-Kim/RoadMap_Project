import { IsNotEmpty } from 'class-validator';

export class SaveRoadmapReplyDto {
  @IsNotEmpty()
  contents: string;
}
