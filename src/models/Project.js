import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
  },
  symbol: {
    type: String,
    required: [true, 'Please provide a project symbol'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
  },
  shortDescription: {
    type: String,
  },
  image: {
    type: String,
    default: '/images/projects/default.jpg',
  },
  totalSupply: String,
  initialMarketCap: String,
  idoPrice: String,
  vestingPeriod: String,
  softCap: String,
  hardCap: String,
  raisedAmount: Number,
  targetAmount: Number,
  currency: String,
  roundName: String,
  participants: Number,
  projectStart: String,
  category: {
    type: String,
    default: 'Default',
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published',
  },
  features: [{
    icon: String,
    title: String,
    description: String
  }],
  tokenomics: {
    distribution: [{
      category: String,
      percentage: String
    }],
    vesting: [{
      category: String,
      schedule: String
    }]
  },
  roadmap: [{
    quarter: String,
    title: String,
    items: [String]
  }],
  team: [{
    name: String,
    role: String,
    image: String,
    bio: String
  }],
  socialLinks: {
    twitter: String,
    telegram: String,
    discord: String,
    medium: String,
    website: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 