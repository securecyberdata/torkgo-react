import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import { projects } from '@/data/projectData';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Clear existing projects
    await Project.deleteMany({});

    // Transform and insert the project data
    const transformedProjects = projects.map(project => ({
      title: project.title,
      symbol: project.symbol,
      description: project.description,
      shortDescription: project.shortDescription,
      image: project.image,
      totalSupply: project.totalSupply,
      initialMarketCap: project.initialMarketCap,
      idoPrice: project.idoPrice,
      vestingPeriod: project.vestingPeriod,
      softCap: project.softCap,
      hardCap: project.hardCap,
      raisedAmount: project.raisedAmount,
      targetAmount: project.targetAmount,
      currency: project.currency,
      roundName: project.roundName,
      participants: project.participants,
      projectStart: project.projectStart,
      status: 'published',
      features: project.features.map(f => ({
        icon: f.icon,
        title: f.title,
        description: f.description
      })),
      tokenomics: {
        distribution: project.tokenomics.distribution,
        vesting: project.tokenomics.vesting
      },
      roadmap: project.roadmap.map(r => ({
        quarter: r.quarter,
        title: r.title,
        items: r.items
      })),
      team: project.team.map(t => ({
        name: t.name,
        role: t.role,
        image: t.image,
        bio: t.bio
      })),
      socialLinks: {
        twitter: project.socialLinks.twitter || '#',
        telegram: project.socialLinks.telegram || '#',
        discord: project.socialLinks.discord || '#',
        medium: project.socialLinks.medium || '#',
        website: project.socialLinks.website || '#'
      }
    }));

    // Insert the transformed projects
    await Project.insertMany(transformedProjects);

    res.status(200).json({ 
      success: true, 
      message: 'Database seeded successfully',
      count: transformedProjects.length
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ success: false, error: 'Failed to seed database' });
  }
} 