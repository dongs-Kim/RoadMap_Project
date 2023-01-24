import { PickType } from '@nestjs/swagger';
import { Roadmap } from 'src/entities/roadmap.entity';

export class CreateRoadmapDto extends PickType(Roadmap, [
  'category',
  'public',
  'title',
]) {}
