import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import fs from 'fs-extra';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roadmap } from 'src/entities/roadmap.entity';
import path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Roadmap)
    private roadmapsRepository: Repository<Roadmap>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.id = shortUUID.generate();
    user.email = createUserDto.email;
    user.password = await hashPassword(createUserDto.password_origin);
    user.nickname = createUserDto.nickname;
    user.comment = createUserDto.comment;
    user.image = createUserDto.image;

    await this.usersRepository.save(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async getFavoriteRoadmaps(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        StoredRoadmaps: true,
      },
    });
    return user.StoredRoadmaps;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return true;
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return true;
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    // 기존 비밀번호 체크
    if (!bcrypt.compareSync(changePasswordDto.password_prev, user.password)) {
      throw new BadRequestException('비밀번호가 틀렸습니다');
    }

    const updateParam = {
      password: await hashPassword(changePasswordDto.password_origin),
    };
    await this.usersRepository.update(user.id, updateParam);
    return true;
  }

  async storeRoadmap(user: User, roadmap_id: string) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
    if (!roadmap) {
      throw new BadRequestException('로드맵이 존재하지 않습니다');
    }

    const storeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: {
        StoredRoadmaps: true,
      },
    });

    // 이미 저장 했는지 체크
    if (storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
      return true;
    }

    // StoredRoadmaps에 추가
    storeUser.StoredRoadmaps.push(roadmap);
    await this.usersRepository.save(storeUser);
    return true;
  }

  async unstoreRoadmap(user: User, roadmap_id: string) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
    if (!roadmap) {
      throw new BadRequestException('로드맵이 존재하지 않습니다');
    }

    const storeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: {
        StoredRoadmaps: true,
      },
    });

    // 저장되어 있는지 확인
    if (!storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
      return true;
    }

    // StoredRoadmaps에서 삭제
    storeUser.StoredRoadmaps = storeUser.StoredRoadmaps.filter(
      (x) => x.id !== roadmap_id,
    );
    await this.usersRepository.save(storeUser);
    return true;
  }

  async isStore(user: User, roadmap_id: string) {
    const storeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: { StoredRoadmaps: true },
    });
    if (!storeUser) {
      return false;
    }
    return storeUser.StoredRoadmaps.some(
      (roadmap) => roadmap.id === roadmap_id,
    );
  }

  async uploadProfileImage(user: User, url: string) {
    await this.usersRepository.update(user.id, { image: url });
  }

  async deleteProfileImage(user: User) {
    if (!user.image) {
      return;
    }
    await fs.remove(path.join(__dirname, '../../public', user.image));
    await this.usersRepository.update(user.id, { image: null });
  }
}

function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
