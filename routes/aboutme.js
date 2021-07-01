import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aboutme', { title: 'ChadNaps | About Me' });
});

export default router;
