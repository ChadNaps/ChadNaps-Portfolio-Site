import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'ChadNaps | Projects' });
});

export default router;
