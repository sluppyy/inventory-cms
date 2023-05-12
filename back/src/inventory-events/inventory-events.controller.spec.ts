import { Test, TestingModule } from '@nestjs/testing'
import { InventoryEventsController } from './inventory-events.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { InventoryEventsService } from './inventory-events.service'
import { SequelizeInventoryEventsRepo } from './inventory-events.sequelizeRepo'
import { InventoryEventsRepo } from './inventory-events.repo'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ItemsDeleted, ItemsGiven } from './inventory-events.sequelizeModels'

describe('InventoryEventsController', () => {
  let controller: InventoryEventsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          autoLoadModels: true,
          logging: false
        }),
        SequelizeModule.forFeature([ItemsGiven, ItemsDeleted]),
        EventEmitterModule.forRoot()
      ],
      controllers: [InventoryEventsController],
      providers: [
        InventoryEventsService,
        {
          provide: InventoryEventsRepo,
          useClass: SequelizeInventoryEventsRepo
        }
      ]
    }).compile()

    controller = module.get<InventoryEventsController>(
      InventoryEventsController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
