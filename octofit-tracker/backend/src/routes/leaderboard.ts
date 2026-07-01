import { Router } from 'express'
import LeaderboardEntry from '../models/leaderboard.ts'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .sort({ rank: 1 })
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean()
    res.json({ message: 'Leaderboard route', data: leaderboard })
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error })
  }
})

export default router
