import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientConstroller';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', () => {
  console.log('teste');
});
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
