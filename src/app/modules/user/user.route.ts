import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidatio } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidatio.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
