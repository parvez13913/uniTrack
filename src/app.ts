import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import usersRouter from '../src/app/modules/users/users.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(process.env)

// Applications routes
app.use('/api/v1/users/', usersRouter)

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
