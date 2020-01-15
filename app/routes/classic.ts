import KoaRouter from 'koa-router'

import classicController from '../api/v1/classicController'
import Auth from '../../middlewares/auth'

const router = new KoaRouter()

router.prefix('/v1/classic')

router.get('/latest', new Auth().m, classicController.getLatest)

export default router
