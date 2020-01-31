import { Router } from 'express';

const routes = new Router();

routes.get('/', () => {
  console.log('teste');
});

export default routes;
