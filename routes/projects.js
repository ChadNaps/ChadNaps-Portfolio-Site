import { Router } from 'express';
import projects from '../models/projects.js'; // List of projects
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects', projects: projects });
});

export default router;
