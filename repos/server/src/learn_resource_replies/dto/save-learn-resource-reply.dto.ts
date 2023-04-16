import { IsNotEmpty } from 'class-validator';

export class SaveLearnResourceReplyDto {
  @IsNotEmpty()
  learn_resource_id: string;

  @IsNotEmpty()
  contents: string;
}
