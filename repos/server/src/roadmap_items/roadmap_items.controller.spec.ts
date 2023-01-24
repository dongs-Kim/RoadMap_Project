import { Test, TestingModule } from '@nestjs/testing';
import { RoadmapItemsController } from './roadmap_items.controller';
import { RoadmapItemsService } from './roadmap_items.service';

describe('RoadmapItemsController', () => {
  let controller: RoadmapItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadmapItemsController],
      providers: [RoadmapItemsService],
    }).compile();

    controller = module.get<RoadmapItemsController>(RoadmapItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
