import koaCombineRoutes from 'koa-combine-routers'

import classicRouter from './classic'
import userRouter from './user'
import tokenRouter from './token'

export default koaCombineRoutes(classicRouter, userRouter, tokenRouter)
