import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/entities/reply.entity';
import { Roadmap } from 'src/entities/roadmap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Roadmap])],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule {}
