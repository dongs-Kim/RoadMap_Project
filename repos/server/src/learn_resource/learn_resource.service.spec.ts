import { Test, TestingModule } from '@nestjs/testing';
import { LearnResourceService } from './learn_resource.service';

describe('LearnResourceService', () => {
  let service: LearnResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnResourceService],
    }).compile();

    service = module.get<LearnResourceService>(LearnResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
