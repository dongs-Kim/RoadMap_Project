import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { LearnResource } from 'src/entities/learn_resource';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
import { UpdateLearnResourceDto } from './dto/update-learn_resource.dto';

@Injectable()
export class LearnResourceService {
  constructor(
    @InjectRepository(LearnResource)
    private learnResourceRepository: Repository<LearnResource>,
  ) {}

  create(user: User, createLearnResourceDto: CreateLearnResourceDto) {
    const learnResource = new LearnResource();
    learnResource.id = shortUUID.generate();
    learnResource.name = createLearnResourceDto.name;
    learnResource.contents = createLearnResourceDto.contents;
    learnResource.url = createLearnResourceDto.url;
    learnResource.category = createLearnResourceDto.category;
    learnResource.User = user;
    this.learnResourceRepository.create(learnResource);
    return true;
  }

  findAll() {
    return `This action returns all learnResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnResource`;
  }

  update(id: number, updateLearnResourceDto: UpdateLearnResourceDto) {
    return `This action updates a #${id} learnResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} learnResource`;
  }
}
