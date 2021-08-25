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

/* GET Ant Rush project */
router.get('/Ant%20Rush', (req, res, next) => {
  for (const project of projects) {
    if (project.name == "Ant Rush") {
      res.sendFile(req.app.locals.path.join(req.app.locals.__dirname, 'public/local-projects/Ant Rush 1.4.zip'), (err) => {
        if (err) {
          next(err);
        } else {
          console.log("Sent Ant Rush!");
        }
      });
    }
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects', projects: projects });
});

export default router;
