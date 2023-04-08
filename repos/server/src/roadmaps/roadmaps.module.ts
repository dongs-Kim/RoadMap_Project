import { Module } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { RoadmapsController } from './roadmaps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Roadmap } from 'src/entities/roadmap.entity';
import { RoadmapItem } from 'src/entities/roadmap_item.entity';
import { RoadmapEdge } from 'src/entities/roadmap_edge.entity';
import { LearnResource } from 'src/entities/learn_resource';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Roadmap,
      RoadmapItem,
      RoadmapEdge,
      LearnResource,
    ]),
  ],
  controllers: [RoadmapsController],
  providers: [RoadmapsService],
})
export class RoadmapsModule {}
