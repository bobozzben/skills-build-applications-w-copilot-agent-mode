import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = parseInt(process.env.PORT ?? '8000', 10)
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit-tracker'

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' })
})

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log(`Connected to MongoDB at ${MONGO_URL}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }

  console.log(`Backend server listening on http://localhost:${PORT}`)
})
