// This script seeds the MongoDB database with default projects
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { projects } = require('../src/data/projectData');

// Connect to MongoDB
async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Define Project model
const ProjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/images/igo/project/default.png',
  },
  totalSupply: {
    type: String,
    required: true,
  },
  initialMarketCap: {
    type: String,
    required: true,
  },
  idoPrice: {
    type: String,
    required: true,
  },
  vestingPeriod: {
    type: String,
    required: true,
  },
  softCap: {
    type: String,
    required: true,
  },
  hardCap: {
    type: String,
    required: true,
  },
  raisedAmount: {
    type: Number,
    default: 0,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  roundName: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    default: 0,
  },
  projectStart: {
    type: String,
    required: true,
  },
  features: [{
    icon: String,
    title: String,
    description: String,
  }],
  tokenomics: {
    distribution: [{
      category: String,
      percentage: String,
    }],
    vesting: [{
      category: String,
      schedule: String,
    }],
  },
  roadmap: [{
    quarter: String,
    title: String,
    items: [String],
  }],
  team: [{
    name: String,
    role: String,
    image: String,
    bio: String,
  }],
  socialLinks: {
    twitter: String,
    telegram: String,
    discord: String,
    website: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// Seed the database
async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Connect to the database
    await connectDB();
    
    // Clear existing projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Format projects for database
    console.log('Formatting projects...');
    const formattedProjects = projects.map(project => ({
      ...project,
      id: String(project.id), // Ensure ID is a string
    }));
    
    console.log('Projects to insert:', formattedProjects.length);
    console.log('Sample project:', JSON.stringify(formattedProjects[0], null, 2));
    
    // Insert projects into the database
    console.log('Inserting projects...');
    const insertedProjects = await Project.insertMany(formattedProjects);
    console.log(`Successfully seeded ${insertedProjects.length} projects`);
    
    // Verify the insertion
    const count = await Project.countDocuments();
    console.log(`Total projects in database: ${count}`);
    
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 