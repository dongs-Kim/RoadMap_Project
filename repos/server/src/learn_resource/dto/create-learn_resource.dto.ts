import { IsNotEmpty } from 'class-validator';

export class CreateLearnResourceDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  name: string;

  url?: string;

  contents?: string;
}
