import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
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
    @Query('sort') sort: string,
    @Query('sortType') sortType: string,
    @Query('page') page: number,
  ) {
    return this.learnResourceService.getLearnResources(
      category,
      keyword,
      sort,
      sortType,
      page,
    );
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.learnResourceService.getOne(id);
  }
}
