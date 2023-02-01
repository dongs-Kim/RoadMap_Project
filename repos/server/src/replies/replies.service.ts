import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import shortUUID from 'short-uuid';
import { Reply } from 'src/entities/reply.entity';
import { Roadmap } from 'src/entities/roadmap.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetRoadmapReplyDto } from './dto/get-roadmap-reply.dto';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private repliesRepository: Repository<Reply>,
    @InjectRepository(Roadmap)
    private roadmapsRepository: Repository<Roadmap>,
  ) {}

  async saveReply(id: string, user: User, contents: string) {
    const roadmap = await this.roadmapsRepository.findOneBy({ id });
    if (!roadmap) {
      throw new BadRequestException();
    }
    const reply = new Reply();
    reply.id = shortUUID.generate();
    reply.contents = contents;
    reply.User = user;
    reply.Roadmap = roadmap;
    await this.repliesRepository.save(reply);
    return true;
  }

  async getReplies(id: string) {
    const replies = await this.repliesRepository.find({
      where: {
        Roadmap: {
          id: id,
        },
      },
      relations: {
        User: true,
      },
      order: {
        created_at: 'desc',
      },
    });

    return replies.map<GetRoadmapReplyDto>((reply) => ({
      id: reply.id,
      contents: reply.contents,
      created_at: reply.created_at,
      user_id: reply.User.id,
      user_nickname: reply.User.nickname,
    }));
  }

  async update(id: string, contents: string, user: User) {
    const reply = await this.repliesRepository.findOne({
      where: { id },
      relations: { User: true },
    });
    if (!reply) {
      throw new BadRequestException();
    }
    if (reply.User.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.repliesRepository.update(id, { contents });
    return true;
  }

  async remove(id: string, user: User) {
    const reply = await this.repliesRepository.findOne({
      where: { id },
      relations: { User: true },
    });
    if (!reply) {
      throw new BadRequestException();
    }
    if (reply.User.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.repliesRepository.delete(id);
    return true;
  }
}
