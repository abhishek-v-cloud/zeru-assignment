import express from 'express'
import { getValidators } from '../controllers/validatorController.js'

const router = express.Router()
router.get('/', getValidators)

export default router
