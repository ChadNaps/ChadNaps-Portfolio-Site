import { Router } from 'express';
import projects from '../models/projects.js'; // List of projects
const router = Router();

/* GET Reaction Timer project */
router.get('/Reaction%20Timer', (req, res, next) => {
  for (const project of projects) {
    if (project.name == "Reaction Timer") {
      res.redirect("../local-projects/reaction-timer-project.html");
    }
  }
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

/* GET externally linked projects */
router.get(/\/.+/, (req, res, next) => {
  for (const project of projects) {
    if ('/' + encodeURI(project.name) == req.path) {
      res.redirect(project.URL);
    }
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects', projects: projects });
});

export default router;
