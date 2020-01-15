import jwt from 'jsonwebtoken'

import config from '../config/config'

function generateToken(uid: number) {
  const { secretKey, expiresIn } = config.security

  return jwt.sign({ uid }, secretKey, {
    expiresIn
  })
}

export { generateToken }
