import express from 'express'
import { getRestakers } from '../controllers/restakerController.js'

const router = express.Router()
router.get('/', getRestakers)

export default router
