import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoadmapItemsService } from './roadmap_items.service';
import { CreateRoadmapItemDto } from './dto/create-roadmap_item.dto';
import { UpdateRoadmapItemDto } from './dto/update-roadmap_item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roadmap-items')
@Controller('roadmap-items')
export class RoadmapItemsController {
  constructor(private readonly roadmapItemsService: RoadmapItemsService) {}

  @Post()
  create(@Body() createRoadmapItemDto: CreateRoadmapItemDto) {
    return this.roadmapItemsService.create(createRoadmapItemDto);
  }

  @Get()
  findAll() {
    return this.roadmapItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadmapItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoadmapItemDto: UpdateRoadmapItemDto,
  ) {
    return this.roadmapItemsService.update(+id, updateRoadmapItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadmapItemsService.remove(+id);
  }
}
