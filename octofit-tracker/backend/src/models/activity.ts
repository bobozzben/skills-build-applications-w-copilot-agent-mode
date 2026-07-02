import { Schema, model, Types } from 'mongoose'

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  team: { type: Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
})

export default model('Activity', activitySchema)
