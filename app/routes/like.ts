import KoaRouter from 'koa-router'

import likeController from '../api/v1/likeController'
import Auth from '../../middlewares/auth'
import { UserLevel } from '../lib/emnu'

const router = new KoaRouter({
  prefix: '/v1/like'
})

router.post('/', new Auth(UserLevel.User).m, likeController.like)
router.post('/cancel', new Auth(UserLevel.User).m, likeController.dislike)

export default router
