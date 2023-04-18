import { Test, TestingModule } from '@nestjs/testing';
import { WebtoonService } from './webtoon.service';

describe('WebtoonService', () => {
  let service: WebtoonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebtoonService],
    }).compile();

    service = module.get<WebtoonService>(WebtoonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
