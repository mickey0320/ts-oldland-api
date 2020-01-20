import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'book' })
class Book extends Model<Book> {
  @PrimaryKey
  @Column
  public id!: number
  @Column
  public fav_nums!: number
}

export default Book
