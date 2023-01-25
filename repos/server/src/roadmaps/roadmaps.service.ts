import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { Roadmap } from 'src/entities/roadmap.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectRepository(Roadmap)
    private roadmapsRepository: Repository<Roadmap>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createRoadmapDto: CreateRoadmapDto, user_id: string) {
    // user 조회
    const user = await this.usersRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new BadRequestException();
    }

    const roadmap = new Roadmap();
    roadmap.id = shortUUID.generate();
    roadmap.category = createRoadmapDto.category;
    roadmap.public = createRoadmapDto.public;
    roadmap.title = createRoadmapDto.title;
    roadmap.User = user;

    await this.roadmapsRepository.save(roadmap);
  }

  findAll() {
    return this.roadmapsRepository.find();
  }

  findOne(id: string) {
    return this.roadmapsRepository.findOneBy({ id });
  }

  async update(id: string, updateRoadmapDto: UpdateRoadmapDto) {
    await this.roadmapsRepository.update(id, updateRoadmapDto);
  }

  async remove(id: string) {
    await this.roadmapsRepository.delete(id);
  }

  async like(id: string, user: User) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // 이미 like 했는지 체크
    if (roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에 추가
    roadmap.LikeUsers.push(user);
    await this.roadmapsRepository.save(roadmap);
  }

  async unlike(roadmap_id: string, user: User) {
    // roadmap 조회
    const roadmap = await this.roadmapsRepository.findOne({
      where: { id: roadmap_id },
      relations: {
        LikeUsers: true,
      },
    });
    if (!roadmap) {
      return;
    }

    // like 되어 있는지 확인
    if (!roadmap.LikeUsers.some((x) => x.id === user.id)) {
      return;
    }

    // LikeUsers에서 삭제
    roadmap.LikeUsers = roadmap.LikeUsers.filter((x) => x.id !== user.id);
    await this.roadmapsRepository.save(roadmap);
  }
}
