import { IsDefined, IsIn, IsNotEmpty } from 'class-validator';
import { EN_CATEGORY } from 'src/common/enums';

export class CreateRoadmapDto {
  @IsIn(Object.values(EN_CATEGORY))
  category: string;

  @IsDefined()
  public: boolean;

  @IsNotEmpty()
  title: string;

  contents?: string;
}
