import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ChadNaps | Home' });
});

/* GET old site. */
router.get('/old', (req, res, next) => {
  res.sendFile(req.app.locals.path.join(req.app.locals.__dirname, 'site.old/index.html'));
});

export default router;
