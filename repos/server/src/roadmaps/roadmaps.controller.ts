import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/entities/user.entity';
import { SaveRoadmapDto } from './dto/save-roadmap.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  thumbnailOption,
  UPLOAD_THUMBNAIL_PATH,
} from './thumbnail-upload.option';

@ApiTags('roadmaps')
@Controller('api/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @ApiOperation({ summary: '로드맵 저장' })
  @UseGuards(LoggedInGuard)
  @Post()
  create(@User() user: UserEntity, @Body() saveRoadmapDto: SaveRoadmapDto) {
    return this.roadmapsService.save(user, saveRoadmapDto);
  }

  @ApiOperation({ summary: '전체 로드맵 조회' })
  @Get()
  findAll() {
    return this.roadmapsService.findAll();
  }

  @ApiOperation({ summary: '내 로드맵 조회' })
  @UseGuards(LoggedInGuard)
  @Get('list/my')
  findMyAll(@User() user: UserEntity) {
    return this.roadmapsService.findMyAll(user);
  }

  @ApiOperation({ summary: '특정 로드맵 조회' })
  @Get(':id')
  findOne(@Param('id') id: string, @Query('mode') mode?: string) {
    return this.roadmapsService.findOneSet(id, mode);
  }

  @ApiOperation({ summary: '로드맵 수정' })
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() updateRoadmapDto: UpdateRoadmapDto,
  ) {
    return this.roadmapsService.update(id, updateRoadmapDto, user);
  }

  @ApiOperation({ summary: '로드맵 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.roadmapsService.remove(id, user);
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

  @ApiOperation({ summary: '로드맵 좋아요 여부' })
  @UseGuards(LoggedInGuard)
  @Get(':id/isLike')
  isLike(@User() user: UserEntity, @Param('id') id: string) {
    return this.roadmapsService.isLike(id, user);
  }

  @ApiOperation({ summary: '썸네일 업로드' })
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('image', thumbnailOption))
  @Post(':id/thumbnail')
  async uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const url = `/${UPLOAD_THUMBNAIL_PATH}/${file.filename}`;
    await this.roadmapsService.uploadThumbnail(id, url);
    return url;
  }
}
