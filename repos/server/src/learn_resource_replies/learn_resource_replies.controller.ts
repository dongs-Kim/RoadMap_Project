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
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/entities/user.entity';
import { SaveLearnResourceReplyDto } from './dto/save-learn-resource-reply.dto';
import { UpdateLearnResourceReplyDto } from './dto/update-learn-resource-reply.dto';
import { LearnResourceRepliesService } from './learn_resource_replies.service';

@ApiTags('learnResourcereplies')
@Controller('api/learn-resource-replies')
export class LearnResourceRepliesController {
  constructor(
    private readonly learnResourceRepliesService: LearnResourceRepliesService,
  ) {}

  @ApiOperation({ summary: '댓글 작성' })
  @UseGuards(LoggedInGuard)
  @Post()
  saveReply(
    @User() user: UserEntity,
    @Body() reply: SaveLearnResourceReplyDto,
  ) {
    return this.learnResourceRepliesService.saveReply(
      reply.learn_resource_id,
      user,
      reply.contents,
    );
  }

  @ApiOperation({ summary: '댓글 조회' })
  @Get(':id')
  getReplies(@Param('id') id: string) {
    return this.learnResourceRepliesService.getReplies(id);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @UseGuards(LoggedInGuard)
  @Patch(':id')
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() updateLearnResourceReplyDto: UpdateLearnResourceReplyDto,
  ) {
    return this.learnResourceRepliesService.update(
      id,
      updateLearnResourceReplyDto.contents,
      user,
    );
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete(':id')
  remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.learnResourceRepliesService.remove(id, user);
  }
}
