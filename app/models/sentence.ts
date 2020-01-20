import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'sentence' })
class Sentence extends Model<Sentence> {
  @Column
  public title!: string
  @Column
  public content!: string
  @Column
  public image!: string
  @Column
  public pubdate!: string
  @Column
  public fav_nums!: number
  @Column
  public type!: string
}

export default Sentence
