import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/entities/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule {}
