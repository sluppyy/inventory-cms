import { Injectable } from '@nestjs/common'
import { InventoryRepo } from './inventory.repo'
import { AddItems, DeleteItems } from './inventory.dtos'
import { UserItems } from './inventory.models'
import {
  ItemNotExistsError,
  NonPositiveCountError,
  TooBigCount
} from './inventory.error'
import { InventoryEventsService } from 'inventory-events/inventory-events.service'
import { ItemsService } from 'items'

@Injectable()
export class InventoryService {
  constructor(
    private readonly _repo: InventoryRepo,
    private readonly _eventService: InventoryEventsService,
    private readonly _itemsService: ItemsService
  ) {}

  async findAllUserItems(userId: string) {
    return await this._repo.findUserItems(userId)
  }

  async addItems(dto: AddItems) {
    if (!(await this._itemsService.findOne(dto.itemId)))
      throw new ItemNotExistsError()

    if (dto.count <= 0) throw new NonPositiveCountError()

    let current = await this._repo.findUserItems(dto.userId, dto.itemId)
    if (!current) {
      current = await this._repo.create(dto.userId, dto.itemId, dto.count)
    }
    const items = await this._repo.update(
      { userId: dto.userId, itemId: dto.itemId },
      (ui) => ui.copy({ count: ui.count + dto.count })
    )
    await this._eventService.itemsGiven(dto)
    return items
  }

  async deleteItems(dto: DeleteItems) {
    if (!(await this._itemsService.findOne(dto.itemId)))
      throw new ItemNotExistsError()

    if (dto.count <= 0) throw new NonPositiveCountError()

    const current = await this._repo.findUserItems(dto.userId, dto.itemId)
    if (!current) return null

    if (current.count < dto.count) throw new TooBigCount()

    if (current.count === dto.count) {
      await this._repo.delete({ userId: dto.userId, itemId: dto.itemId })
      await this._eventService.itemsDeleted(dto)
      return new UserItems(dto.userId, dto.itemId, 0)
    }

    const items = await this._repo.update(
      { userId: dto.userId, itemId: dto.itemId },
      (ui) => ui.copy({ count: ui.count - dto.count })
    )
    await this._eventService.itemsDeleted(dto)
    return items
  }
}
