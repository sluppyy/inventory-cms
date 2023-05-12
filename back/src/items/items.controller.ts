import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post
} from '@nestjs/common'
import { ItemsService } from './items.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  CreateItem,
  DeleteItem,
  PublicItem,
  UpdateItem,
  publicItem
} from './items.dtos'

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly _service: ItemsService) {}

  @Get()
  async findAll(): Promise<PublicItem[]> {
    return (await this._service.findAll()).map(publicItem)
  }

  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateItem): Promise<PublicItem> {
    return publicItem(await this._service.add(dto))
  }

  @ApiBearerAuth()
  @Patch()
  async update(@Body() dto: UpdateItem): Promise<PublicItem> {
    const item = await this._service.update(dto)
    if (!item) throw new NotFoundException()

    return publicItem(item)
  }

  @ApiBearerAuth()
  @Delete()
  async delete(@Body() dto: DeleteItem): Promise<boolean> {
    const item = await this._service.delete(dto)
    if (!item) throw new NotFoundException()

    return true
  }
}
