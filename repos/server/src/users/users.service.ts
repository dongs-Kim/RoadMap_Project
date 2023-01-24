import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roadmap } from 'src/entities/roadmap.entity';

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
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        password: true,
      },
    });
    if (!user) {
      return;
    }

    // 기존 비밀번호 체크
    if (!bcrypt.compareSync(changePasswordDto.password_prev, user.password)) {
      return;
    }

    const updateParam = {
      password: await hashPassword(changePasswordDto.password_origin),
    };
    await this.usersRepository.update(id, updateParam);
  }

  async storeRoadmap(user: User, roadmap_id: string) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
    if (!roadmap) {
      return;
    }

    const storeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: {
        StoredRoadmaps: true,
      },
    });

    // 이미 저장 했는지 체크
    if (storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
      return;
    }

    // StoredRoadmaps에 추가
    storeUser.StoredRoadmaps.push(roadmap);
    await this.usersRepository.save(storeUser);
  }

  async unstoreRoadmap(user: User, roadmap_id: string) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOneBy({ id: roadmap_id });
    if (!roadmap) {
      return;
    }

    const storeUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: {
        StoredRoadmaps: true,
      },
    });

    // 저장되어 있는지 확인
    if (!storeUser.StoredRoadmaps.some((x) => x.id === roadmap_id)) {
      return;
    }

    // StoredRoadmaps에서 삭제
    storeUser.StoredRoadmaps = storeUser.StoredRoadmaps.filter(
      (x) => x.id !== roadmap_id,
    );
    await this.usersRepository.save(storeUser);
  }
}

function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
