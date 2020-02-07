import { Router } from 'express';
import multer from 'multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientConstroller';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrderController from './app/controllers/OrderController';
import CheckOrdersController from './app/controllers/CheckOrdersController';
import OrderDeliveredController from './app/controllers/OrderDeliveredController';
import StartDateOrderController from './app/controllers/StartDateOrderController';
import EndDateOrderController from './app/controllers/EndDateOrderController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/deliveryman/:id/delivered', OrderDeliveredController.index);
routes.get('/deliveryman/:id/deliveries', CheckOrdersController.index);

routes.put('/start-order/:id', StartDateOrderController.update);
routes.post(
  '/end-order/:id',
  upload.single('file'),
  EndDateOrderController.store
);

routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymen', DeliveryManController.index);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.delete);

export default routes;
