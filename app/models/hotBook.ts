import { Model, DataTypes } from 'sequelize'

import db from '../../core/db'

class HotBook extends Model {
  public id!: number
  public index!: number
  public image!: string
  public author!: string
  public title!: string
}

HotBook.init(
  {
    index: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'hot_book',
    sequelize: db
  }
)

export default HotBook
