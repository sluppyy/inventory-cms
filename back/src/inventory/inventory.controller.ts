import { Controller, Get, Param } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly _service: InventoryService) {}

  @Get(':userId')
  async getUserItems(@Param('userId') userId: string) {
    return await this._service.findAllUserItems(userId)
  }
}
