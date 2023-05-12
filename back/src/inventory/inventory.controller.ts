import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthAdminGuard } from 'auth/authAdmin.guard'
import { AddItems, DeleteItems } from './inventory.dtos'

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly _service: InventoryService) {}

  @Get(':userId')
  async getUserItems(@Param('userId') userId: string) {
    return await this._service.findAllUserItems(userId)
  }

  @ApiOperation({ summary: 'gives item to user' })
  @ApiBearerAuth()
  @UseGuards(AuthAdminGuard)
  @Post('give-items')
  async giveItems(@Body() dto: AddItems) {
    await this._service.addItems(dto)
  }

  @ApiOperation({ summary: 'delete items from user' })
  @ApiBearerAuth()
  @UseGuards(AuthAdminGuard)
  @Post('delete-items')
  async deleteItems(@Body() dto: DeleteItems) {
    await this._service.deleteItems(dto)
  }
}
