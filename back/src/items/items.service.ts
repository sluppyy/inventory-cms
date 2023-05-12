import { Injectable } from '@nestjs/common'
import { ItemsRepo } from './items.repo'
import { CreateItem, UpdateItem, DeleteItem } from './items.dtos'
import { Item } from './items.models'

@Injectable()
export class ItemsService {
  constructor(private readonly _repo: ItemsRepo) {}

  async add(dto: CreateItem) {
    return await this._repo.create(dto)
  }

  async findOne(id: string): Promise<Item | null> {
    const items = await this._repo.findAll({ id })
    return items[0] ?? null
  }

  async findAll() {
    return await this._repo.findAll({ deleted: false })
  }

  async update(dto: UpdateItem) {
    return await this._repo.update(dto)
  }

  async delete(dto: DeleteItem) {
    return await this._repo.update({ id: dto.id, deleted: true })
  }
}
