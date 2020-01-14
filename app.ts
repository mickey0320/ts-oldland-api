import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import routes from './app/routes'
import catchError from './middlewares/exception'

const app = new Koa()

app.use(catchError)
app.use(bodyParser())
app.use(routes())

app.listen(8080, () => {
  console.log('the server is started')
})
