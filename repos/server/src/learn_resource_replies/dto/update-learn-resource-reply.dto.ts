import { IsNotEmpty } from 'class-validator';

export class UpdateLearnResourceReplyDto {
  @IsNotEmpty()
  contents: string;
}
