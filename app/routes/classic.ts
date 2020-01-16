import KoaRouter from 'koa-router'

import classicController from '../api/v1/classicController'
import Auth from '../../middlewares/auth'
import { UserLevel } from '../lib/emnu'

const router = new KoaRouter()

router.prefix('/v1/classic')

router.get('/latest', new Auth(UserLevel.User).m, classicController.getLatest)

export default router
