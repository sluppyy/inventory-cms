import { Item } from 'items/items.sequelizeModels'
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

@Table
export class UserItems extends Model {
  @PrimaryKey
  @Column
  readonly userId: string

  @BelongsTo(() => Item)
  readonly item: Item

  @PrimaryKey
  @ForeignKey(() => Item)
  @Column
  readonly itemId: number

  @Column
  readonly count: number
}
