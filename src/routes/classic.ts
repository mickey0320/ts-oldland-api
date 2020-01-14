import KoaRouter from 'koa-router'

import classicController from '../api/v1/classicController'

const router = new KoaRouter()

router.prefix('/v1/classic')

router.get('/latest', classicController.getLatest)

export default router
