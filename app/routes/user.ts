import KoaRouter from 'koa-router'

import userController from '../api/v1/userController'

const router = new KoaRouter({
  prefix: '/v1/user'
})

router.post('/register', userController.register)

export default router
