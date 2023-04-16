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
import { GetLearnResourceReplyDto } from './dto/get-learn-resource-reply.dto';
import { LearnResourceReply } from 'src/entities/learn_resource_reply.entity';
import { LearnResource } from 'src/entities/learn_resource';

@Injectable()
export class LearnResourceRepliesService {
  constructor(
    @InjectRepository(LearnResourceReply)
    private learnResourceRepliesRepository: Repository<LearnResourceReply>,
    @InjectRepository(LearnResource)
    private learnResourceRepository: Repository<LearnResource>,
  ) {}

  async saveReply(id: string, user: User, contents: string) {
    const learnResource = await this.learnResourceRepository.findOneBy({ id });
    if (!learnResource) {
      throw new BadRequestException();
    }
    const reply = new LearnResourceReply();
    reply.id = shortUUID.generate();
    reply.contents = contents;
    reply.User = user;
    reply.LearnResource = learnResource;
    await this.learnResourceRepliesRepository.save(reply);
    return true;
  }

  async getReplies(id: string) {
    const replies = await this.learnResourceRepliesRepository.find({
      where: {
        LearnResource: {
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

    return replies.map<GetLearnResourceReplyDto>((reply) => ({
      id: reply.id,
      contents: reply.contents,
      created_at: reply.created_at,
      user_id: reply.User.id,
      user_nickname: reply.User.nickname,
      user_image: reply.User.image,
    }));
  }

  async update(id: string, contents: string, user: User) {
    const reply = await this.learnResourceRepliesRepository.findOne({
      where: { id },
      relations: { User: true },
    });
    if (!reply) {
      throw new BadRequestException();
    }
    if (reply.User.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.learnResourceRepliesRepository.update(id, { contents });
    return true;
  }

  async remove(id: string, user: User) {
    const reply = await this.learnResourceRepliesRepository.findOne({
      where: { id },
      relations: { User: true },
    });
    if (!reply) {
      throw new BadRequestException();
    }
    if (reply.User.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.learnResourceRepliesRepository.delete(id);
    return true;
  }
}
