import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import NewOrderMail from '../jobs/NewOrderMail';

import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const order = await Order.findAll({ as: 'Deliverymen' });
    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.string().required(),
      recipient_id: Yup.string().required(),
      signature_id: Yup.string(),
      product: Yup.string().required(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.create(req.body);
    const { deliveryman_id } = req.body;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    await Queue.add(NewOrderMail.key, {
      deliveryman: deliveryman.name,
      deliveryman_email: deliveryman.email,
      product: order.product,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.string(),
      deliveryman_id: Yup.string(),
      signature_id: Yup.string(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const updatedOrder = await order.update(req.body);

    return res.json(updatedOrder);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    await order.destroy();

    return res.json({
      message: `Order with ID ${req.params.id} was deleted`,
    });
  }
}

export default new OrderController();
