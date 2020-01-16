export default {
  environment: 'dev',
  database: {
    dbname: 'oldland',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yixin841210'
  },
  security: {
    secretKey: 'fjdsakl;fjklsad',
    expiresIn: 60 * 60
  },
  wx: {
    appId: 'wx99362072302405a6',
    appSecret: '35c48e71df5ad4141338c1aa31fbfa79',
    api:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
