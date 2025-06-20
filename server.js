import express from 'express'
import dotenv from 'dotenv'
import { initializeDb } from './config/db.js'
import router from './routes/index.js'

dotenv.config()

const app = express()
app.use(express.json())

initializeDb(app, process.env.PORT, process.env.DB_PATH)

app.use('/', router)
