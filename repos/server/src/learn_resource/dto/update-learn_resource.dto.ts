import { PartialType } from '@nestjs/swagger';
import { CreateLearnResourceDto } from './create-learn_resource.dto';

export class UpdateLearnResourceDto extends PartialType(
  CreateLearnResourceDto,
) {}
