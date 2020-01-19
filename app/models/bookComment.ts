import { Model, DataTypes } from 'sequelize'

import db from '../../core/db'

class BookCommnet extends Model {
  public id!: number
  public content!: string
  public nums!: number
  public bookId!: number
}
BookCommnet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(12)
    },
    nums: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bookId: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'book_comment',
    sequelize: db
  }
)

export default BookCommnet
