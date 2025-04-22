import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch project' });
      }
      break;

    case 'PUT':
      try {
        const project = await Project.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update project' });
      }
      break;

    case 'DELETE':
      try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete project' });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
} 