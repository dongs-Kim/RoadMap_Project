import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { User as UserEntity } from 'src/entities/user.entity';
import { LearnResourceService } from './learn_resource.service';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@Controller('api/learn-resource')
export class LearnResourceController {
  constructor(private readonly learnResourceService: LearnResourceService) {}

  @UseGuards(LoggedInGuard)
  @Post()
  create(
    @User() user: UserEntity,
    @Body() createLearnResourceDto: CreateLearnResourceDto,
  ) {
    return this.learnResourceService.create(user, createLearnResourceDto);
  }

  @Get()
  getList(
    @Query('category') category: string,
    @Query('keyword') keyword: string,
    @Query('user_id') user_id: string,
    @Query('sort') sort: string,
    @Query('sortType') sortType: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.learnResourceService.getLearnResources(
      category,
      keyword,
      user_id,
      sort,
      sortType,
      page,
      pageSize,
    );
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.learnResourceService.getOne(id);
  }

  @UseGuards(LoggedInGuard)
  @Get(':id/isLike')
  isLike(@User() user: UserEntity, @Param('id') id: string) {
    return this.learnResourceService.isLike(id, user);
  }

  @UseGuards(LoggedInGuard)
  @Post(':id/like')
  like(@User() user: UserEntity, @Param('id') id: string) {
    return this.learnResourceService.like(id, user);
  }

  @UseGuards(LoggedInGuard)
  @Post(':id/unlike')
  unlike(@User() user: UserEntity, @Param('id') id: string) {
    return this.learnResourceService.unlike(id, user);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  delete(@User() user: UserEntity, @Param('id') id: string) {
    return this.learnResourceService.delete(id, user);
  }
}
