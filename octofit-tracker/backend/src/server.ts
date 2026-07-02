import express from 'express'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'
import { connectDatabase } from './config/database.js'

const app = express()
const PORT = parseInt(process.env.PORT ?? '8000', 10)
const CODESPACE_NAME = process.env.CODESPACE_NAME
const BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running', baseUrl: BASE_URL })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.listen(PORT, async () => {
  try {
    await connectDatabase()
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }

  console.log(`Backend server listening on ${BASE_URL}`)
})
