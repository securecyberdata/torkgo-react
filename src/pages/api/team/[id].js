import { connectDB } from '@/lib/mongodb';
import Team from '@/models/Team';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const team = await Team.findById(id);
        if (!team) {
          return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json(team);
      } catch (error) {
        return res.status(500).json({ error: 'Error fetching team member' });
      }

    case 'PUT':
      try {
        const team = await Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!team) {
          return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json(team);
      } catch (error) {
        return res.status(500).json({ error: 'Error updating team member' });
      }

    case 'DELETE':
      try {
        const team = await Team.findByIdAndDelete(id);
        if (!team) {
          return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json({ message: 'Team member deleted successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Error deleting team member' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
} 