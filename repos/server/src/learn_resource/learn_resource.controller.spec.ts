import { Test, TestingModule } from '@nestjs/testing';
import { LearnResourceController } from './learn_resource.controller';
import { LearnResourceService } from './learn_resource.service';

describe('LearnResourceController', () => {
  let controller: LearnResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnResourceController],
      providers: [LearnResourceService],
    }).compile();

    controller = module.get<LearnResourceController>(LearnResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
