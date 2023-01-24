import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('roadmaps')
@Controller('api/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  //@TODO 로그인한 user_id 사용
  @ApiOperation({ summary: '로드맵 생성' })
  @Post(':user_id')
  create(
    @Body() createRoadmapDto: CreateRoadmapDto,
    @Param('user_id') user_id: string,
  ) {
    return this.roadmapsService.create(createRoadmapDto, user_id);
  }

  @ApiOperation({ summary: '전체 로드맵 조회' })
  @Get()
  findAll() {
    return this.roadmapsService.findAll();
  }

  @ApiOperation({ summary: '특정 로드맵 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadmapsService.findOne(id);
  }

  @ApiOperation({ summary: '로드맵 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoadmapDto: UpdateRoadmapDto) {
    return this.roadmapsService.update(id, updateRoadmapDto);
  }

  @ApiOperation({ summary: '로드맵 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadmapsService.remove(id);
  }

  //@TODO 로그인한 user_id 사용
  @ApiOperation({ summary: '로드맵 좋아요 체크' })
  @Patch(':id/like/:user_id')
  like(@Param('id') id: string, @Param('user_id') user_id: string) {
    return this.roadmapsService.like(id, user_id);
  }

  //@TODO 로그인한 user_id 사용
  @ApiOperation({ summary: '로드맵 좋아요 해제' })
  @Patch(':id/unlike/:user_id')
  unlike(@Param('id') id: string, @Param('user_id') user_id: string) {
    return this.roadmapsService.unlike(id, user_id);
  }
}
