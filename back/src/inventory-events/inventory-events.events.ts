export abstract class InventoryEvent {
  at: Date
  userId: string
}

export class ItemsGiven extends InventoryEvent {
  itemId: number
  count: number
}

export class ItemsDeleted extends InventoryEvent {
  itemId: number
  count: number
}
