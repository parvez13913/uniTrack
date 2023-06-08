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
/*app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'Ore Baba Error')
  next('Ore Baba Error')
})*/

app.use(globalErrorHandler)

export default app
