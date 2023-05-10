import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEventsService } from './inventory-events.service';

describe('InventoryEventsService', () => {
  let service: InventoryEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryEventsService],
    }).compile();

    service = module.get<InventoryEventsService>(InventoryEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
