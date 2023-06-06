import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log(`Database is conneted successfull`)
    app.listen(config.port, () => {
      // console.log(`Application app listening on port ${config.port}`)
    })
  } catch (err) {
    // console.log('Fail to connect database', err)
  }
}

bootstrap()
