import { Controller } from '@nestjs/common'
import { InventoryEventsService } from './inventory-events.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('inventory-events')
@Controller('inventory-events')
export class InventoryEventsController {
  constructor(private readonly _service: InventoryEventsService) {}
}
