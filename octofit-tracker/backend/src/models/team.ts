import { Schema, model, Types } from 'mongoose'

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

export default model('Team', teamSchema)
