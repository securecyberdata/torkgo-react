import { connectDB } from '@/lib/mongodb';
import Team from '@/models/Team';
import { teamMembers as defaultTeamMembers } from '@/data/teamData';

export default async function handler(req, res) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://www.sayariglobal.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.status(200).end();
    return;
  }

  // Set CORS headers for actual requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://www.sayariglobal.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  try {
    console.log('[API] Connecting to database...');
    await connectDB();
    console.log('[API] Database connected successfully');

    switch (req.method) {
      case 'GET':
        try {
          console.log('[API] Fetching team members...');
          const teams = await Team.find({});
          console.log(`[API] Found ${teams.length} team members`);

          if (teams.length === 0) {
            console.log('[API] No team members found, inserting default data...');
            await Team.insertMany(defaultTeamMembers);
            return res.status(200).json(defaultTeamMembers);
          }

          return res.status(200).json(teams);
        } catch (error) {
          console.error('[API] Error fetching team members:', error);
          return res.status(500).json({ 
            success: false,
            error: 'Error fetching team members',
            details: error.message 
          });
        }

      case 'POST':
        try {
          console.log('[API] Creating new team member...');
          const team = await Team.create(req.body);
          console.log('[API] Team member created successfully');
          return res.status(201).json(team);
        } catch (error) {
          console.error('[API] Error creating team member:', error);
          return res.status(500).json({ 
            success: false,
            error: 'Error creating team member',
            details: error.message 
          });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        return res.status(405).json({ 
          success: false,
          error: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('[API] Database connection error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Database connection error',
      details: error.message 
    });
  }
} 