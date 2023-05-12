import { Column, Default, Model, Table } from 'sequelize-typescript'

@Table
export class Item extends Model {
  @Column
  name: string

  @Column
  description: string

  @Default(false)
  @Column
  deleted: boolean

  @Column
  imgUrl?: string

  @Column
  meta?: string
}
