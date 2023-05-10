import { Test, TestingModule } from '@nestjs/testing';
import { TessController } from './tess.controller';

describe('TessController', () => {
  let controller: TessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TessController],
    }).compile();

    controller = module.get<TessController>(TessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
