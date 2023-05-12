import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { InventoryEventsService } from './inventory-events.service'
import { DeleteItems, GiveItems } from './inventory-events.dtos'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthAdminGuard } from 'auth/authAdmin.guard'

@ApiBearerAuth()
@ApiTags('inventory-events')
@Controller('inventory-events')
export class InventoryEventsController {
  constructor(private readonly _service: InventoryEventsService) {}

  @ApiOperation({ summary: 'allows to give item to user' })
  @UseGuards(AuthAdminGuard)
  @Post('give-items')
  async giveItems(@Body() dto: GiveItems) {
    await this._service.itemsGiven(dto)
  }

  @ApiOperation({ summary: 'allows to delete item from user inventory' })
  @UseGuards(AuthAdminGuard)
  @Post('delete-items')
  async deleteItems(@Body() dto: DeleteItems) {
    await this._service.itemsDeleted(dto)
  }
}
