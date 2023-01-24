import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/entities/user.entity';
import { StoreRoadmapDto } from './dto/store-roadmap.dto';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @UseGuards(NotLoggedInGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logOut(() => {
      res.clearCookie('connect.sid', { httpOnly: true });
      res.send();
    });
  }

  @ApiOperation({ summary: '사용자 생성' })
  @UseGuards(NotLoggedInGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(LoggedInGuard)
  @Get()
  getUser(@User() user: UserEntity) {
    return user;
  }

  @ApiOperation({ summary: '사용자 수정' })
  @UseGuards(LoggedInGuard)
  @Patch()
  update(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @UseGuards(LoggedInGuard)
  @Delete()
  remove(@User() user: UserEntity) {
    return this.usersService.remove(user.id);
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @UseGuards(LoggedInGuard)
  @Patch('change-password')
  changePassword(
    @User() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.id, changePasswordDto);
  }

  @ApiOperation({ summary: '로드맵 저장' })
  @UseGuards(LoggedInGuard)
  @Post('store-roadmap')
  storeRoadmap(
    @User() user: UserEntity,
    @Body() storeRoadmapDto: StoreRoadmapDto,
  ) {
    return this.usersService.storeRoadmap(user, storeRoadmapDto.roadmap_id);
  }

  @ApiOperation({ summary: '로드맵 저장 취소' })
  @UseGuards(LoggedInGuard)
  @Post('unstore-roadmap')
  unstoreRoadmap(
    @User() user: UserEntity,
    @Body() storeRoadmapDto: StoreRoadmapDto,
  ) {
    return this.usersService.unstoreRoadmap(user, storeRoadmapDto.roadmap_id);
  }
}
