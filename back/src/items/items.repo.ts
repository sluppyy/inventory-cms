import { CreateItem } from './items.dtos'
import { Item } from './items.models'

export abstract class ItemsRepo {
  abstract create(dto: CreateItem): Promise<Item>
  abstract findAll(filter?: Partial<Item>): Promise<Item[]>
  abstract update(
    data: Partial<Omit<Item, 'id' | 'imgUrl' | 'meta'>> & {
      id: string
      imgUrl?: string | null
      meta?: string | null
    }
  ): Promise<Item | null>
}
