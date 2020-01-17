import { Model, DataTypes } from 'sequelize'

import sequelize from '../../core/db'

class Flow extends Model {
  public artId!: number
  public index!: number
  public type!: number
}
Flow.init(
  {
    artId: {
      type: DataTypes.INTEGER
    },
    index: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.TINYINT
    }
  },
  {
    tableName: 'flow',
    sequelize
  }
)

export default Flow
