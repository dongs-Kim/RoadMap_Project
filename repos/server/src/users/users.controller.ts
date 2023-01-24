import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 생성' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '모든 사용자 조회' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '특정 사용자 조회' })
  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @ApiOperation({ summary: '사용자 수정' })
  @Patch(':user_id')
  update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove(user_id);
  }
}
