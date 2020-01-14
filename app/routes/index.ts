import koaCombineRoutes from 'koa-combine-routers'

import classicRouter from './classic'

export default koaCombineRoutes(classicRouter)
