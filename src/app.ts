import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(process.env)

// Applications routes
app.use('/api/v1/users/', UserRoutes)

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing errorLogger')
// })

app.use(globalErrorHandler)

export default app
