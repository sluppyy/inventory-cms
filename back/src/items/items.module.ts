import { Module } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Item } from './items.sequelizeModels'
import { ItemsRepo } from './items.repo'
import { SequelizeItemsRepo } from './items.sequelizeRepo'
import { AuthModule } from 'auth'

@Module({
  imports: [SequelizeModule.forFeature([Item]), AuthModule],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: ItemsRepo,
      useClass: SequelizeItemsRepo
    }
  ]
})
export class ItemsModule {}
