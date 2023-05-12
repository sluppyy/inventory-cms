import { Injectable } from '@nestjs/common'
import { CreateItem } from './items.dtos'
import { Item } from './items.models'
import { Item as DBItem } from './items.sequelizeModels'
import { ItemsRepo } from './items.repo'
import { Repository } from 'sequelize-typescript'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class SequelizeItemsRepo extends ItemsRepo {
  constructor(
    @InjectModel(DBItem)
    private readonly _repo: Repository<DBItem>
  ) {
    super()
  }

  async create({ description, name, imgUrl, meta }: CreateItem): Promise<Item> {
    const db = await this._repo.create({
      description,
      name,
      imgUrl,
      meta
    })
    return map(db)
  }

  async findAll(filter = {}): Promise<Item[]> {
    return (await this._repo.findAll({ where: filter })).map(map)
  }

  async update(data: Partial<Item> & { id: string }): Promise<Item | null> {
    const { id, ...payload } = data
    const current = await this._repo.findOne({ where: { id } })
    if (!current) return null

    await current.update(payload)
    await current.save()

    return map(current)
  }
}

function map(db: DBItem): Item {
  return new Item(
    String(db.id),
    db.name,
    db.description,
    db.deleted,
    db.imgUrl,
    db.meta
  )
}
