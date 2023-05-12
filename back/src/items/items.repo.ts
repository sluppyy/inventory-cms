import { CreateItem } from './items.dtos'
import { Item } from './items.models'

export abstract class ItemsRepo {
  abstract create(dto: CreateItem): Promise<Item>
  abstract findAll(filter?: Partial<Item>): Promise<Item[]>
  abstract update(data: Partial<Item> & { id: string }): Promise<Item | null>
}
