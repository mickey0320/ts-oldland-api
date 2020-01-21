import path from 'path'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'

import routes from './app/routes'
import catchError from './middlewares/exception'
import sequelize from './core/sequelize'

const app = new Koa()

sequelize.sync({})

app.use(catchError)
app.use(koaStatic(path.join(__dirname, './static')))
app.use(bodyParser())
app.use(routes())

app.listen(8080, () => {
  console.log('the server is started')
})
