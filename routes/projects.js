import { Router } from 'express';
import projects from '../models/projects.js'; // List of projects
const router = Router();

router.get('/Generic%20Software%20Receptionist', (req, res, next) => {
  for (const project of projects) {
    if (project.name == "Generic Software Receptionist") {
      res.redirect(project.URL);
    }
  }
  res.redirect(projects)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects', projects: projects });
});

export default router;
