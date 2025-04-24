import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expertise: [{
    type: String
  }],
  social: {
    twitter: String,
    linkedin: String,
    facebook: String,
    instagram: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Team || mongoose.model('Team', teamSchema); 