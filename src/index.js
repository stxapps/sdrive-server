import express from 'express';

import { isString } from './utils';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const host = req.get('host');
  if (isString(host) && host.toLowerCase().startsWith('stacksdrive.com')) {
    return res.redirect(302, `https://www.${host}${req.url}`);
  }
  return next();
});

app.get('/', (_req, res) => {
  res.send('Welcome to <a href="https://www.stacksdrive.com">Stacks Drive</a>\'s server!');
});

// Listen to the App Engine-specified port, or 8088 otherwise
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log('Press Ctrl+C to quit.');
});
