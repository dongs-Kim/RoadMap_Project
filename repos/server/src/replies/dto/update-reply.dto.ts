import { IsNotEmpty } from 'class-validator';

export class UpdateReplyDto {
  @IsNotEmpty()
  contents: string;
}
