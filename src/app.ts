import Koa, { Context } from 'koa'

import routes from './routes'

const app = new Koa()

app.use(routes())

app.listen(8080, () => {
  console.log('the server is started')
})
