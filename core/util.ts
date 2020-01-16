import jwt from 'jsonwebtoken'

import config from '../config/config'

function generateToken(uid: number, scope: number) {
  const { secretKey, expiresIn } = config.security

  return jwt.sign({ uid, scope }, secretKey, {
    expiresIn
  })
}

export { generateToken }
