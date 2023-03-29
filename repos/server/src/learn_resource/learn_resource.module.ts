import { Module } from '@nestjs/common';
import { LearnResourceService } from './learn_resource.service';
import { LearnResourceController } from './learn_resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnResource } from 'src/entities/learn_resource';

@Module({
  imports: [TypeOrmModule.forFeature([LearnResource])],
  controllers: [LearnResourceController],
  providers: [LearnResourceService],
})
export class LearnResourceModule {}
