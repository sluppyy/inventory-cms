import { Module } from '@nestjs/common'
import { InventoryController } from './inventory.controller'
import { InventoryService } from './inventory.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserItems } from './inventory.sequelizeModels'
import { InventoryRepo } from './inventory.repo'
import { SequelizeInventoryRepo } from './inventory.sequelizeRepo'
import { InventoryEventsModule } from 'inventory-events'
import { AuthModule } from 'auth'
import { ItemsModule } from 'items'

@Module({
  imports: [
    SequelizeModule.forFeature([UserItems]),
    InventoryEventsModule,
    AuthModule,
    ItemsModule
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    { provide: InventoryRepo, useClass: SequelizeInventoryRepo }
  ]
})
export class InventoryModule {}
