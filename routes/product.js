import express from 'express'
import { createProductController } from '../controller/product.js'
import { authenticate } from '../middleware/authenticate.js'
const router = express.Router()


router.get('/',()=>{})
router.post('/',authenticate,createProductController)
router.patch('/',()=>{})
router.delete('/',()=>{})

export default router