import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export default async function handler(req, res) {
  console.log(`[API] ${req.method} /api/projects - Starting request`);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  try {
    console.log('[API] Connecting to database...');
    await dbConnect();
    console.log('[API] Database connected successfully');

    switch (req.method) {
      case 'GET':
        try {
          console.log('[API] Fetching projects...');
          const projects = await Project.find({}).sort({ createdAt: -1 });
          console.log(`[API] Found ${projects.length} projects`);
          return res.status(200).json({ 
            success: true, 
            data: projects 
          });
        } catch (error) {
          console.error('[API] Error fetching projects:', error);
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch projects',
            details: error.message 
          });
        }

      case 'POST':
        try {
          console.log('[API] Creating new project...');
          const project = await Project.create(req.body);
          console.log('[API] Project created successfully:', project._id);
          return res.status(201).json({ 
            success: true, 
            data: project 
          });
        } catch (error) {
          console.error('[API] Error creating project:', error);
          return res.status(500).json({ 
            success: false, 
            error: 'Failed to create project',
            details: error.message 
          });
        }

      default:
        console.log('[API] Method not allowed:', req.method);
        return res.status(405).json({ 
          success: false, 
          error: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('[API] Database connection error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message 
    });
  }
} 