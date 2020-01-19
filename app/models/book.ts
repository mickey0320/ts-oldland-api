import { Model, DataTypes } from 'sequelize'

import db from '../../core/db'

class Book extends Model {
  public id!: number
  public favNums!: number
}
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    favNums: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: 'book',
    sequelize: db
  }
)

export default Book
