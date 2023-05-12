import { Repository } from 'sequelize-typescript'
import { UserItems } from './inventory.models'
import { InventoryRepo } from './inventory.repo'
import { UserItems as DBUserItems } from './inventory.sequelizeModels'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class SequelizeInventoryRepo extends InventoryRepo {
  constructor(
    @InjectModel(DBUserItems)
    private readonly _repo: Repository<DBUserItems>
  ) {
    super()
  }

  async create(
    userId: string,
    itemId: string,
    count: number
  ): Promise<UserItems> {
    return map(
      await this._repo.create({ userId, itemId: Number(itemId), count })
    )
  }

  findUserItems(userId: string): Promise<UserItems[]>
  findUserItems(userId: string, itemId: string): Promise<UserItems>
  async findUserItems(
    userId: string,
    itemId?: string
  ): Promise<UserItems[] | (UserItems | null)> {
    if (itemId) {
      const ins = await this._repo.findOne({
        where: { userId, itemId: Number(itemId) }
      })
      if (!ins) return null
      return map(ins)
    } else {
      return (await this._repo.findAll({ where: { userId } })).map(map)
    }
  }

  async update(
    filter: Partial<UserItems>,
    f: (ui: UserItems) => UserItems
  ): Promise<UserItems | null> {
    const cur = await this._repo.findOne({ where: mapFilter(filter) })
    if (!cur) return null
    const mapped = f(map(cur))

    for (const key in mapped) {
      cur[key] = mapped[key]
    }
    await cur.save()
    return mapped
  }

  async delete(filter: Partial<UserItems>): Promise<number> {
    return await this._repo.destroy({ where: mapFilter(filter) })
  }
}

function map(db: DBUserItems): UserItems {
  return new UserItems(db.userId, db.itemId.toString(), db.count)
}

function mapFilter(filter: Partial<UserItems>): Partial<DBUserItems> {
  const copy: any = { ...filter }

  if ('itemId' in filter) {
    copy.itemId = Number.parseInt(filter.itemId ?? 'NaN') || null
  }

  return copy
}
