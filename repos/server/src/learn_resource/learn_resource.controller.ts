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
import { User as UserEntity } from 'src/entities/user.entity';
import { LearnResourceService } from './learn_resource.service';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
import { UpdateLearnResourceDto } from './dto/update-learn_resource.dto';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@Controller('learn-resource')
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
  findAll() {
    return this.learnResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnResourceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearnResourceDto: UpdateLearnResourceDto,
  ) {
    return this.learnResourceService.update(+id, updateLearnResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnResourceService.remove(+id);
  }
}
