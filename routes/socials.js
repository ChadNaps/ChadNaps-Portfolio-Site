import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('socials', { title: 'ChadNaps | Socials' });
});

export default router;
