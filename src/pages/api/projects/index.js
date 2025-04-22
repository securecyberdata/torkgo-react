import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed' 
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        console.log('Projects fetched:', projects.length);
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
        const project = await Project.create(req.body);
        console.log('Project created:', project._id);
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