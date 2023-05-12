import { Test, TestingModule } from '@nestjs/testing'
import { InventoryEventsService } from './inventory-events.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter'
import {
  ItemsDeleted as DBItemsDeleted,
  ItemsGiven as DBItemsGiven
} from './inventory-events.sequelizeModels'
import { InventoryEventsRepo } from './inventory-events.repo'
import { SequelizeInventoryEventsRepo } from './inventory-events.sequelizeRepo'
import { ItemsDeleted, ItemsGiven } from './inventory-events.events'

describe('InventoryEventsService', () => {
  let service: InventoryEventsService
  let giveEvents: ItemsGiven[]
  let deleteEvents: ItemsDeleted[]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          autoLoadModels: true,
          logging: false
        }),
        SequelizeModule.forFeature([DBItemsGiven, DBItemsDeleted]),
        EventEmitterModule.forRoot()
      ],
      providers: [
        InventoryEventsService,
        {
          provide: InventoryEventsRepo,
          useClass: SequelizeInventoryEventsRepo
        }
      ]
    }).compile()

    service = module.get<InventoryEventsService>(InventoryEventsService)
    const ee = module.get(EventEmitter2)

    giveEvents = []
    deleteEvents = []
    ee.addListener(
      'inventory-events.items-given',
      giveEvents.push.bind(giveEvents)
    )
    ee.addListener(
      'inventory-events.items-deleted',
      deleteEvents.push.bind(deleteEvents)
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('give items', async () => {
    const e = { count: 1, itemId: 1, userId: '1' }
    await service.itemsGiven(e)

    expect(giveEvents.map(({ at, ...e }) => e)).toEqual([e])
    expect(deleteEvents).toEqual([])
  })

  it('delete items', async () => {
    const e = { count: 1, itemId: 1, userId: '1' }
    await service.itemsDeleted(e)

    expect(deleteEvents.map(({ at, ...e }) => e)).toEqual([e])
    expect(giveEvents).toEqual([])
  })
})
