import Router from 'koa-router';

import DatabaseService from '../services/Database';
import { Player } from '../model/Brawlstars';

const service = new DatabaseService();

const router = new Router();

router.post('/track', async (ctx, next) => {
  // fire and forget - do not await
  service.storeBrawlstarsRecord(<Player> ((<any> ctx.request).body));
  await next();
});

export default router.routes();