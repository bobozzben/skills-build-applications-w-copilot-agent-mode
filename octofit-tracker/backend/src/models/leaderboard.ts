import { Schema, model, Types } from 'mongoose'

const leaderboardEntrySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  team: { type: Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
})

export default model('LeaderboardEntry', leaderboardEntrySchema)
