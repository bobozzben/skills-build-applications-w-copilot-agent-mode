import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email role').lean()
    res.json({ message: 'Teams route', data: teams })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error })
  }
})

export default router
