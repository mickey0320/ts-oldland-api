import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'movie' })
class Movie extends Model<Movie> {
  @Column
  public title!: string
  @Column
  public content!: string
  @Column
  public image!: string
  @Column
  public pubdate!: string
  @Column
  public favNums!: number
  @Column
  public type!: string
}

export default Movie
