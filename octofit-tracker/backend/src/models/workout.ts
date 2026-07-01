import { Schema, model, Types } from 'mongoose'

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  createdAt: { type: Date, default: () => new Date() },
  author: { type: Types.ObjectId, ref: 'User' }
})

export default model('Workout', workoutSchema)
