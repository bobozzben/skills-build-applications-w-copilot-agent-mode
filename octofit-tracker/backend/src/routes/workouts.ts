import { Router } from 'express'
import Workout from '../models/workout.ts'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('author', 'name email').lean()
    res.json({ message: 'Workouts route', data: workouts })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error })
  }
})

export default router
