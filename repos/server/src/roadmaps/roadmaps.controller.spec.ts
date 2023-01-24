import { Test, TestingModule } from '@nestjs/testing';
import { RoadmapsController } from './roadmaps.controller';
import { RoadmapsService } from './roadmaps.service';

describe('RoadmapsController', () => {
  let controller: RoadmapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadmapsController],
      providers: [RoadmapsService],
    }).compile();

    controller = module.get<RoadmapsController>(RoadmapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
