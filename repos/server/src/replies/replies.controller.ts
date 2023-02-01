import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepliesService } from './replies.service';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/entities/user.entity';
import { SaveRoadmapReplyDto } from './dto/save-roadmap-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@ApiTags('replies')
@Controller('api/replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @ApiOperation({ summary: '댓글 작성' })
  @UseGuards(LoggedInGuard)
  @Post()
  saveReply(@User() user: UserEntity, @Body() reply: SaveRoadmapReplyDto) {
    return this.repliesService.saveReply(
      reply.roadmap_id,
      user,
      reply.contents,
    );
  }

  @ApiOperation({ summary: '댓글 조회' })
  @Get(':id')
  getReplies(@Param('id') id: string) {
    return this.repliesService.getReplies(id);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    return this.repliesService.update(id, updateReplyDto.contents, user);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.repliesService.remove(id, user);
  }
}
