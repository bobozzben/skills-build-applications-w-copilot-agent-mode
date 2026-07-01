import { Router } from 'express'
import Activity from '../models/activity.ts'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean()
    res.json({ message: 'Activities route', data: activities })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error })
  }
})

export default router
