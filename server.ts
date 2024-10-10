import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { globalErrorHandler } from './src/utils/errorHandling.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    
    handle(req, res, parsedUrl).catch((err) => {
      globalErrorHandler(err, req, res, () => {});
    });
  }).listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
