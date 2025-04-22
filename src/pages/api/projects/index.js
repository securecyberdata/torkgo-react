import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export default async function handler(req, res) {
  console.log('API Route: /api/projects - Method:', req.method);
  
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching projects...');
        const projects = await Project.find({}).sort({ createdAt: -1 });
        console.log('Projects fetched successfully:', projects.length);
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch projects',
          details: error.message 
        });
      }
      break;

    case 'POST':
      try {
        console.log('Creating new project...');
        const project = await Project.create(req.body);
        console.log('Project created successfully:', project._id);
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ 
          success: false, 
          error: 'Failed to create project',
          details: error.message 
        });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
} 