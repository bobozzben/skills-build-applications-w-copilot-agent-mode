import mongoose from 'mongoose'
import User from '../models/user.ts'
import Team from '../models/team.ts'
import Activity from '../models/activity.ts'
import Workout from '../models/workout.ts'
import LeaderboardEntry from '../models/leaderboard.ts'

// Seed the octofit_db database with test data
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  await mongoose.connect(MONGO_URL)
  console.log('Connected to MongoDB for seed:', MONGO_URL)

  await User.deleteMany({})
  await Team.deleteMany({})
  await Activity.deleteMany({})
  await Workout.deleteMany({})
  await LeaderboardEntry.deleteMany({})

  const users = await User.create([
    { name: 'Ava Brooks', email: 'ava.brooks@example.com', role: 'member' },
    { name: 'Noah Chen', email: 'noah.chen@example.com', role: 'coach' },
    { name: 'Maya Patel', email: 'maya.patel@example.com', role: 'member' }
  ])

  const teams = await Team.create([
    { name: 'Sunrise Striders', description: 'Morning runners who love community routes', members: [users[0]._id, users[2]._id] },
    { name: 'Core Crushers', description: 'High-intensity interval team for weeknight workouts', members: [users[1]._id] }
  ])

  const workouts = await Workout.create([
    { title: 'Interval Blast', description: '20-minute high-intensity session', durationMinutes: 20, intensity: 'high', author: users[1]._id },
    { title: 'Recovery Ride', description: 'Easy cycling pace for active rest', durationMinutes: 35, intensity: 'low', author: users[0]._id }
  ])

  const activities = await Activity.create([
    { user: users[0]._id, team: teams[0]._id, type: 'run', durationMinutes: 45, distanceKm: 8.2, caloriesBurned: 520, date: new Date() },
    { user: users[2]._id, team: teams[0]._id, type: 'yoga', durationMinutes: 60, distanceKm: 0, caloriesBurned: 240, date: new Date() },
    { user: users[1]._id, team: teams[1]._id, type: 'strength', durationMinutes: 50, distanceKm: 0, caloriesBurned: 560, date: new Date() }
  ])

  await LeaderboardEntry.create([
    { user: users[0]._id, team: teams[0]._id, score: 820, rank: 1 },
    { user: users[2]._id, team: teams[0]._id, score: 760, rank: 2 },
    { user: users[1]._id, team: teams[1]._id, score: 710, rank: 3 }
  ])

  console.log('Seeded octofit_db database with test data')
  console.log('Users:', users.length)
  console.log('Teams:', teams.length)
  console.log('Workouts:', workouts.length)
  console.log('Activities:', activities.length)

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB after seed')
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
