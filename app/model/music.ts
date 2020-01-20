import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'music' })
class Music extends Model<Music> {
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
  @Column
  public url!: string
}

export default Music
