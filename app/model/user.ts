import { Model, Column, Table, AutoIncrement, PrimaryKey } from 'sequelize-typescript'

import bcrypt from 'bcryptjs'

@Table({ tableName: 'user' })
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number

  @Column
  public nickname!: string

  @Column
  public email!: string
  @Column
  public get password() {
    return this.getDataValue('password')
  }
  public set password(val: string) {
    const salt = bcrypt.genSaltSync(10)
    const hashPwd = bcrypt.hashSync(val, salt)
    this.setDataValue('password', hashPwd)
  }
  @Column
  public openid!: string
}

export default User
