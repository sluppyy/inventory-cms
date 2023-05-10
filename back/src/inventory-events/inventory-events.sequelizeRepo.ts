import { Repository } from 'sequelize-typescript'
import { ItemsGiven, ItemsDeleted } from './inventory-events.events'
import {
  ItemsGiven as DBItemsGiven,
  ItemsDeleted as DBItemsDeleted
} from './inventory-events.sequelizeModels'
import { InventoryEventsRepo } from './inventory-events.repo'
import { InjectModel } from '@nestjs/sequelize'

export class SequelizeInventoryEventsRepo extends InventoryEventsRepo {
  constructor(
    @InjectModel(DBItemsGiven)
    private readonly _giveRepo: Repository<DBItemsGiven>,
    @InjectModel(DBItemsDeleted)
    private readonly _deleteRepo: Repository<DBItemsDeleted>
  ) {
    super()
  }

  async saveItemsGiven({
    at,
    count,
    itemId,
    userId
  }: ItemsGiven): Promise<void> {
    await this._giveRepo.create({
      at,
      count,
      itemId,
      userId
    })
  }

  async saveItemsDeleted({
    at,
    count,
    itemId,
    userId
  }: ItemsDeleted): Promise<void> {
    await this._deleteRepo.create({
      at,
      count,
      itemId,
      userId
    })
  }
}
