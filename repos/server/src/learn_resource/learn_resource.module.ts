import { Module } from '@nestjs/common';
import { LearnResourceService } from './learn_resource.service';
import { LearnResourceController } from './learn_resource.controller';

@Module({
  controllers: [LearnResourceController],
  providers: [LearnResourceService],
})
export class LearnResourceModule {}
