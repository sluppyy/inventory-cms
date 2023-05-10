import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { InventoryEventsRepo } from './inventory-events.repo'
import { ItemsDeleted, ItemsGiven } from './inventory-events.events'

/**
 * emitting events: inventory-events.items-given inventory-events.items-deleted
 */
@Injectable()
export class InventoryEventsService {
  constructor(
    private readonly _ee: EventEmitter2,
    private readonly _repo: InventoryEventsRepo
  ) {}

  async itemsGiven(event: Omit<ItemsGiven, 'at'>) {
    await this._repo.saveItemsGiven({ ...event, at: new Date() })
    await this._ee.emitAsync('inventory-events.items-given', event)
  }

  async itemsDeleted(event: Omit<ItemsDeleted, 'at'>) {
    await this._repo.saveItemsDeleted({ ...event, at: new Date() })
    await this._ee.emitAsync('inventory-events.items-deleted', event)
  }
}
