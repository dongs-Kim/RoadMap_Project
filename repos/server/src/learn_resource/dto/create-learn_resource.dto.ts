import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateLearnResourceDto {
  id?: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  name: string;

  @IsDefined()
  mode: 'new' | 'modify';

  url?: string[];

  contents?: string;
}
