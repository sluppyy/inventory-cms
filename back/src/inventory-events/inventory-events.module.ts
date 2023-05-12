import { Module } from '@nestjs/common'
import { InventoryEventsService } from './inventory-events.service'
import { InventoryEventsRepo } from './inventory-events.repo'
import { SequelizeInventoryEventsRepo } from './inventory-events.sequelizeRepo'
import { SequelizeModule } from '@nestjs/sequelize'
import { ItemsDeleted, ItemsGiven } from './inventory-events.sequelizeModels'
// import { InventoryEventsController } from './inventory-events.controller'
import { AuthModule } from 'auth'

@Module({
  imports: [SequelizeModule.forFeature([ItemsGiven, ItemsDeleted]), AuthModule],
  providers: [
    InventoryEventsService,
    {
      provide: InventoryEventsRepo,
      useClass: SequelizeInventoryEventsRepo
    }
  ],
  // controllers: [InventoryEventsController],
  exports: [InventoryEventsService]
})
export class InventoryEventsModule {}
