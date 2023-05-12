import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table
export class UserItems extends Model {
  @PrimaryKey
  @Column
  readonly userId: string

  @PrimaryKey
  @Column
  readonly itemId: number

  @Column
  readonly count: number
}
