import { Injectable } from '@nestjs/common';
import { CreateLearnResourceDto } from './dto/create-learn_resource.dto';
import { UpdateLearnResourceDto } from './dto/update-learn_resource.dto';

@Injectable()
export class LearnResourceService {
  create(createLearnResourceDto: CreateLearnResourceDto) {
    return 'This action adds a new learnResource';
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
