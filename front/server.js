const express = require('express');
const next = require('next');
const logger = require('morgan');

const prod = process.env.NODE_ENV === 'production';
const dev = !prod;

const PORT = process.env.PORT || 3060;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (prod) {
    server.use(logger('combined'));
  } else {
    server.use(logger('dev'));
  }

  server.get('/blog/post/:id', (req, res) => app.render(req, res, '/blog/post', { id: req.params.id }));

  server.get('/blog/write/:id', (req, res) => app.render(req, res, '/blog/write', { id: req.params.id }));

  server.get('/portfolio/project/:id', (req, res) => app.render(req, res, '/portfolio/project', { id: req.params.id }));

  server.get('/portfolio/add/:id', (req, res) => app.render(req, res, '/portfolio/add', { id: req.params.id }));

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, () =>
    console.log(`chanyeong front server running on port ${PORT}\n${prod ? '' : `address: http://localhost:${PORT}`}`),
  );
});
