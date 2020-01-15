import KoaRouter from 'koa-router'

import tokenController from '../api/v1/tokenController'

const router = new KoaRouter({
  prefix: '/v1/token'
})

router.post('/', tokenController.verify)

export default router
