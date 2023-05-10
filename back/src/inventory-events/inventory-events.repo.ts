import { Injectable } from '@nestjs/common'
import { ItemsDeleted, ItemsGiven } from './inventory-events.events'

@Injectable()
export abstract class InventoryEventsRepo {
  private declare _

  abstract saveItemsGiven(event: ItemsGiven): Promise<void>
  abstract saveItemsDeleted(event: ItemsDeleted): Promise<void>
}
