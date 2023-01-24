import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/entities/user.entity';

@ApiTags('roadmaps')
@Controller('api/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @ApiOperation({ summary: '로드맵 생성' })
  @UseGuards(LoggedInGuard)
  @Post()
  create(@User() user: UserEntity, @Body() createRoadmapDto: CreateRoadmapDto) {
    return this.roadmapsService.create(createRoadmapDto, user.id);
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
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoadmapDto: UpdateRoadmapDto) {
    return this.roadmapsService.update(id, updateRoadmapDto);
  }

  @ApiOperation({ summary: '로드맵 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadmapsService.remove(id);
  }

  @ApiOperation({ summary: '로드맵 좋아요 체크' })
  @UseGuards(LoggedInGuard)
  @Post(':id/like')
  like(@User() user: UserEntity, @Param('id') id: string) {
    return this.roadmapsService.like(id, user);
  }

  @ApiOperation({ summary: '로드맵 좋아요 해제' })
  @UseGuards(LoggedInGuard)
  @Post(':id/unlike')
  unlike(@User() user: UserEntity, @Param('id') id: string) {
    return this.roadmapsService.unlike(id, user);
  }
}
