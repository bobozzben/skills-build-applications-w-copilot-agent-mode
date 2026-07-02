import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().lean()
    res.json({ message: 'Users route', data: users })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error })
  }
})

export default router
