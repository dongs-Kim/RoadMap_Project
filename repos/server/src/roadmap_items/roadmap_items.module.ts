import { Module } from '@nestjs/common';
import { RoadmapItemsService } from './roadmap_items.service';
import { RoadmapItemsController } from './roadmap_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadmapItem } from 'src/entities/roadmap_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoadmapItem])],
  controllers: [RoadmapItemsController],
  providers: [RoadmapItemsService],
})
export class RoadmapItemsModule {}
