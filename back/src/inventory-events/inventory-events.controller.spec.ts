import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEventsController } from './inventory-events.controller';

describe('InventoryEventsController', () => {
  let controller: InventoryEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryEventsController],
    }).compile();

    controller = module.get<InventoryEventsController>(InventoryEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
