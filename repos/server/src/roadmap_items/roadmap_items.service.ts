import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoadmapItem } from 'src/entities/roadmap_item.entity';
import { Repository } from 'typeorm';
import { CreateRoadmapItemDto } from './dto/create-roadmap_item.dto';
import { UpdateRoadmapItemDto } from './dto/update-roadmap_item.dto';

@Injectable()
export class RoadmapItemsService {
  constructor(
    @InjectRepository(RoadmapItem)
    private roadmapItemsRepository: Repository<RoadmapItem>,
  ) {}

  create(createRoadmapItemDto: CreateRoadmapItemDto) {
    return 'This action adds a new roadmapItem';
  }

  findAll() {
    return `This action returns all roadmapItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roadmapItem`;
  }

  update(id: number, updateRoadmapItemDto: UpdateRoadmapItemDto) {
    return `This action updates a #${id} roadmapItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} roadmapItem`;
  }
}
