import { Module } from '@nestjs/common'
import { InventoryEventsService } from './inventory-events.service'
import { InventoryEventsRepo } from './inventory-events.repo'
import { SequelizeInventoryEventsRepo } from './inventory-events.sequelizeRepo'
import { SequelizeModule } from '@nestjs/sequelize'
import { ItemsDeleted, ItemsGiven } from './inventory-events.sequelizeModels'
import { InventoryEventsController } from './inventory-events.controller'

@Module({
  imports: [SequelizeModule.forFeature([ItemsGiven, ItemsDeleted])],
  providers: [
    InventoryEventsService,
    {
      provide: InventoryEventsRepo,
      useClass: SequelizeInventoryEventsRepo
    }
  ],
  controllers: [InventoryEventsController],
  exports: [InventoryEventsController]
})
export class InventoryEventsModule {}
