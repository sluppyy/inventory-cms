import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthAdminGuard } from 'auth/authAdmin.guard'
import { AddItems, DeleteItems } from './inventory.dtos'
import { Repository } from 'sequelize-typescript'
import { UserItems } from './inventory.sequelizeModels'
import { Item } from 'items/items.sequelizeModels'
import { InjectModel } from '@nestjs/sequelize'

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly _service: InventoryService,
    @InjectModel(UserItems)
    private readonly _repo: Repository<UserItems>
  ) {}

  @Get(':userId')
  async getUserItems(@Param('userId') userId: string) {
    return (
      await this._repo.findAll({
        where: { userId },
        include: [{ model: Item, required: true }]
      })
    ).map((i) => ({
      item: {
        id: i.item.id,
        name: i.item.name,
        description: i.item.description,
        imgUrl: i.item.imgUrl ?? null,
        meta: i.item.meta ?? null
      },
      count: i.count
    }))
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
