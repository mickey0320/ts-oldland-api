import { Model, DataTypes } from 'sequelize'

import sequelize from '../../core/db'

const classicFields = {
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  pubdate: {
    type: DataTypes.DATEONLY
  },
  favNums: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.TINYINT
  }
}

class Movie extends Model {
  public title!: string
  public content!: string
  public image!: string
  public pubdate!: Date
  public favNums!: number
  public type!: number
}
Movie.init(
  { ...classicFields },
  {
    tableName: 'movie',
    sequelize
  }
)

class Music extends Model {
  public title!: string
  public content!: string
  public image!: string
  public pubdate!: Date
  public favNums!: number
  public type!: number
}
Music.init(
  {
    ...classicFields,
    url: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'music',
    sequelize
  }
)

class Sentence extends Model {
  public title!: string
  public content!: string
  public image!: string
  public pubdate!: Date
  public favNums!: number
  public type!: number
}
Sentence.init(
  { ...classicFields },
  {
    tableName: 'sentence',
    sequelize
  }
)

export { Movie, Music, Sentence }
