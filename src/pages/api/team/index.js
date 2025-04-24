import { connectDB } from '@/lib/mongodb';
import Team from '@/models/Team';
import { teamMembers as defaultTeamMembers } from '@/data/teamData';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const teams = await Team.find({});
        if (teams.length === 0) {
          // If no teams in database, insert default teams
          await Team.insertMany(defaultTeamMembers);
          return res.status(200).json(defaultTeamMembers);
        }
        return res.status(200).json(teams);
      } catch (error) {
        return res.status(500).json({ error: 'Error fetching team members' });
      }

    case 'POST':
      try {
        const team = await Team.create(req.body);
        return res.status(201).json(team);
      } catch (error) {
        return res.status(500).json({ error: 'Error creating team member' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
} 