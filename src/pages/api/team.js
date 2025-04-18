// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { teamMembers } from '@/data/teamData';

// In a real application, this would be stored in a database
// For this demo, we'll use a combination of the static data and any new members
let updatedTeamMembers = [
  ...teamMembers,
  {
    id: 8,
    name: "Shah Rukh",
    role: "Team Member",
    img: "/images/team/default.jpg", // Using a default image
    bio: "Shah Rukh is a valuable member of our team.",
    description: "Shah Rukh brings expertise and dedication to our team.",
    expertise: ["Team Collaboration", "Project Management"],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }
];

export default function handler(req, res) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Return all team members
      res.status(200).json(updatedTeamMembers);
      break;
      
    case 'POST':
      // Add a new team member
      try {
        const newMember = req.body;
        
        // Validate required fields
        if (!newMember.name || !newMember.role) {
          return res.status(400).json({ error: 'Name and role are required' });
        }
        
        // Generate a new ID
        const newId = updatedTeamMembers.length > 0 
          ? Math.max(...updatedTeamMembers.map(m => m.id)) + 1 
          : 1;
        
        // Create the new member object
        const memberToAdd = {
          id: newId,
          name: newMember.name,
          role: newMember.role,
          img: newMember.image || '/images/team/default.jpg',
          bio: newMember.bio || `${newMember.name} is a valuable member of our team.`,
          description: newMember.description || `${newMember.name} brings expertise and dedication to our team.`,
          expertise: newMember.expertise || ['Team Collaboration', 'Project Management'],
          social: {
            twitter: newMember.socialLinks?.twitter || 'https://twitter.com',
            linkedin: newMember.socialLinks?.linkedin || 'https://linkedin.com',
            facebook: newMember.socialLinks?.facebook || 'https://facebook.com',
            instagram: newMember.socialLinks?.instagram || 'https://instagram.com'
          }
        };
        
        // Add the new member to our array
        updatedTeamMembers.push(memberToAdd);
        
        // In a real application, you would save this to a database
        
        res.status(201).json(memberToAdd);
      } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({ error: 'Failed to add team member' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
