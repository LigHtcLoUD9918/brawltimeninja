import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import compress from 'koa-compress';
import statusRouter from './routes/status';
import brawlstarsRouter from './routes/brawlstars';
import vaingloryRouter from './routes/vainglory';

export default function createApp(path: string = '/api') {
  const app = new Koa();
  const router = new Router();

  router.use(path + '/status', statusRouter.routes());
  router.use(path + '/brawlstars', brawlstarsRouter.routes());
  router.use(path + '/vainglory', vaingloryRouter.routes());

  app.use(cors());
  app.use(compress());
  app.use(router.routes());
  return app;
}