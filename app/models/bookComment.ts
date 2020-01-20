import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'book_comment' })
class BookComment extends Model<BookComment> {
  @Column
  public content!: string
  @Column
  public nums!: number
  @Column
  public book_id!: number
}

export default BookComment
