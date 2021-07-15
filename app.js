// Package Imports
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Import Routers
import indexRouter from './routes/index.js';
import projectsRouter from './routes/projects.js';
import aboutmeRouter from './routes/aboutme.js';
import socialsRouter from './routes/socials.js';

// __dirname doesn't exist in ESM, this builds a custom version of it
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Environment
app.set('env', 'development');

// Custom Middleware
app.locals.path = path; // Used to help in routing
app.locals.__dirname = __dirname; // Used to help in routing

// Boilerplate Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Definitions
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/about%20me', aboutmeRouter);
app.use('/socials', socialsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;