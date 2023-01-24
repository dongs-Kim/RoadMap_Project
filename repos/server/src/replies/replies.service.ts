import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from 'src/entities/reply.entity';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private repliesRepository: Repository<Reply>,
  ) {}

  create(createReplyDto: CreateReplyDto) {
    return 'This action adds a new reply';
  }

  findAll() {
    return `This action returns all replies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
