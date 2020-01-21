import { Table, Column, Model } from 'sequelize-typescript'

import config from '../../config/config'

@Table({ tableName: 'music' })
class Music extends Model<Music> {
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
  @Column
  public url!: string
}

export default Music
