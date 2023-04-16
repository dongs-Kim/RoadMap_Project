import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnResource } from 'src/entities/learn_resource';
import { LearnResourceReply } from 'src/entities/learn_resource_reply.entity';
import { LearnResourceRepliesController } from './learn_resource_replies.controller';
import { LearnResourceRepliesService } from './learn_resource_replies.service';

@Module({
  imports: [TypeOrmModule.forFeature([LearnResourceReply, LearnResource])],
  controllers: [LearnResourceRepliesController],
  providers: [LearnResourceRepliesService],
})
export class LearnResourceRepliesModule {}
