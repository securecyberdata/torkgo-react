import { teamMembers } from '@/data/teamData';

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
    switch (req.method) {
      case 'GET':
        try {
          // Returning static data instead of database query to ensure valid JSON
          return res.status(200).json(teamMembers);
        } catch (error) {
          console.error('[API] Error fetching team members:', error);
          return res.status(500).json({ success: false, error: 'Error fetching team members', details: error.message });
        }

      case 'POST':
        try {
          console.log('[API] Creating new team member...');
          //  Database interaction for POST remains as is, assuming it works correctly.
          //const team = await Team.create(req.body);
          //console.log('[API] Team member created successfully');
          //return res.status(201).json(team);
          return res.status(501).json({ success: false, error: 'POST method not yet implemented with static data' });
        } catch (error) {
          console.error('[API] Error creating team member:', error);
          return res.status(500).json({ success: false, error: 'Error creating team member', details: error.message });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred', details: error.message });
  }
}