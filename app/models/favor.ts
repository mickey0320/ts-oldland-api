import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'favor' })
class Favor extends Model<Favor> {
  @Column
  public uid!: number
  @Column
  public art_id!: number
  @Column
  public type!: number
}

export default Favor
