import { Table, Column, Model } from 'sequelize-typescript'

@Table({ tableName: 'flow' })
class Flow extends Model<Flow> {
  @Column
  public art_id!: number
  @Column
  public type!: number
  @Column
  public index!: number
}

export default Flow
