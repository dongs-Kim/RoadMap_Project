import { Test, TestingModule } from '@nestjs/testing';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';

describe('RepliesController', () => {
  let controller: RepliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepliesController],
      providers: [RepliesService],
    }).compile();

    controller = module.get<RepliesController>(RepliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
