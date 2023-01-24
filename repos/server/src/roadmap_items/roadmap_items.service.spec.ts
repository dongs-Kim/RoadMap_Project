import { Test, TestingModule } from '@nestjs/testing';
import { RoadmapItemsService } from './roadmap_items.service';

describe('RoadmapItemsService', () => {
  let service: RoadmapItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoadmapItemsService],
    }).compile();

    service = module.get<RoadmapItemsService>(RoadmapItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
