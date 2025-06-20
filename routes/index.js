import express from 'express'
import restakersRouter from './restakers.js'
import validatorsRouter from './validators.js'
import rewardsRouter from './rewards.js'

const router = express.Router()

router.use('/restakers', restakersRouter)
router.use('/validators', validatorsRouter)
router.use('/rewards', rewardsRouter)

export default router