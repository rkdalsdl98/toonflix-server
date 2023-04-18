import { Test, TestingModule } from '@nestjs/testing';
import { WebtoonController } from './webtoon.controller';

describe('WebtoonController', () => {
  let controller: WebtoonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebtoonController],
    }).compile();

    controller = module.get<WebtoonController>(WebtoonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
