import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ItemsDeleted, ItemsGiven } from 'inventory-events'
import { InventoryRepo } from './inventory.repo'
import { AddItems, DeleteItems } from './inventory.dtos'
import { UserItems } from './inventory.models'
import { NonPositiveCountError, TooBigCount } from './inventory.error'

@Injectable()
export class InventoryService {
  constructor(private readonly _repo: InventoryRepo) {}

  async findAllUserItems(userId: string) {
    return await this._repo.findUserItems(userId)
  }

  async addItems(dto: AddItems) {
    if (dto.count <= 0) throw new NonPositiveCountError()

    let current = await this._repo.findUserItems(dto.userId, dto.itemId)
    if (!current) {
      current = await this._repo.create(dto.userId, dto.itemId, dto.count)
    }
    return await this._repo.update(
      { userId: dto.userId, itemId: dto.itemId },
      (ui) => ui.copy({ count: ui.count + dto.count })
    )
  }

  async deleteItems(dto: DeleteItems) {
    if (dto.count <= 0) throw new NonPositiveCountError()

    const current = await this._repo.findUserItems(dto.userId, dto.itemId)
    if (!current) return null

    if (current.count < dto.count) throw new TooBigCount()

    if (current.count === dto.count) {
      await this._repo.delete({ userId: dto.userId, itemId: dto.itemId })
      return new UserItems(dto.userId, dto.itemId, 0)
    }

    return await this._repo.update(
      { userId: dto.userId, itemId: dto.itemId },
      (ui) => ui.copy({ count: ui.count - dto.count })
    )
  }

  @OnEvent('inventory-events.items-given')
  private async _onAdd(e: ItemsGiven) {
    await this.addItems({
      count: e.count,
      itemId: e.itemId,
      userId: e.userId
    })
  }

  @OnEvent('inventory-events.items-deleted')
  private async _onDeleted(e: ItemsDeleted) {
    await this.deleteItems({
      count: e.count,
      itemId: e.itemId,
      userId: e.userId
    })
  }
}
