import { UserItems } from './inventory.models'

export abstract class InventoryRepo {
  abstract create(
    userId: string,
    itemId: string,
    count: number
  ): Promise<UserItems>

  abstract findUserItems(userId: string): Promise<UserItems[]>
  abstract findUserItems(
    userId: string,
    itemId: string
  ): Promise<UserItems | null>

  abstract update(
    filter: Partial<UserItems>,
    f: (ui: UserItems) => UserItems
  ): Promise<UserItems | null>
  /**
   * returns number of deleted items
   */
  abstract delete(filter: Partial<UserItems>): Promise<number>
}
