import { Router } from 'express';
import projects from '../models/projects.js'; // List of projects
const router = Router();

/* GET Generic Software Receptionist redirect */
router.get('/Generic%20Software%20Receptionist', (req, res, next) => {
  for (const project of projects) {
    if (project.name == "Generic Software Receptionist") {
      res.redirect(project.URL);
    }
  }

  next();
});

/* GET Reaction Timer project */
router.get('/Reaction%20Timer', (req, res, next) => {
  for (const project of projects) {
    if (project.name == "Reaction Timer") {
      res.redirect("../local-projects/reaction-timer-project.html");
    }
  }

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects', projects: projects });
});

export default router;
