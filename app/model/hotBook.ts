import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'hot_book' })
class HotBook extends Model<HotBook> {
  @PrimaryKey
  @Column
  public id!: number
  @Column
  public index!: number
  @Column
  public image!: string
  @Column
  public author!: string
  @Column
  public title!: string
}

export default HotBook
