import { Table, Column, Model } from 'sequelize-typescript'

import config from '../../config/config'

@Table({ tableName: 'movie' })
class Movie extends Model<Movie> {
  @Column
  public title!: string
  @Column
  public content!: string
  @Column
  public get image() {
    return `${config.imageHost.host}${this.getDataValue('image')}`
  }
  public set image(val: string) {
    this.setDataValue('image', val)
  }
  @Column
  public pubdate!: string
  @Column
  public fav_nums!: number
  @Column
  public type!: string
}

export default Movie
