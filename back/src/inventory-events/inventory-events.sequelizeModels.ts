import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class ItemsGiven extends Model {
  @Column
  at: Date

  @Column
  userId: string

  @Column
  itemId: number

  @Column
  count: number
}

@Table
export class ItemsDeleted extends Model {
  @Column
  at: Date

  @Column
  userId: string

  @Column
  itemId: number

  @Column
  count: number
}
