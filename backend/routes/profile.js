import express from "express"
import Profile from "../models/Profile.js"

const router = express.Router()

// GET profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Create/Update profile
router.post('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Error saving profile', error: error.message });
  }
});

// Update profile
router.put('/', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { 
      new: true, upsert: true, runValidators: true 
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get projects (with optional ?skill=) as quey parameter
router.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    let projects = profile.projects;
    if (skill) {
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(skill.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get top skills
router.get('/skills/top', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const topSkills = profile.skills.slice(0, parseInt(limit));
    res.json(topSkills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top skills', error: error.message });
  }
});

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Query parameter "q" is required' });

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const searchTerm = q.toLowerCase();
    const results = {
      skills: profile.skills.filter(skill => skill.toLowerCase().includes(searchTerm)),
      projects: profile.projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        (project.description && project.description.toLowerCase().includes(searchTerm))
      ),
      work: profile.work.filter(work => 
        work.company.toLowerCase().includes(searchTerm) ||
        work.position.toLowerCase().includes(searchTerm) ||
        (work.description && work.description.toLowerCase().includes(searchTerm))
      )
    };
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error performing search', error: error.message });
  }
});

export default router;
