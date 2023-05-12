import { Item } from './items.models'

export class CreateItem {
  name: string
  description: string
  imgUrl?: string
  meta?: string
}

export class UpdateItem {
  id: string
  name?: string
  description: string
  imgUrl?: string | null
  meta?: string | null
}

export class DeleteItem {
  id: string
}

export type PublicItem = Item
