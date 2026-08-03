import { Test, TestingModule } from '@nestjs/testing';
import { MatchdaysController } from './matchdays.controller';

describe('MatchdaysController', () => {
  let controller: MatchdaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchdaysController],
    }).compile();

    controller = module.get<MatchdaysController>(MatchdaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
