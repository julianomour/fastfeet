import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';

class StartDateOrderController {
  async update(req, res) {
    const hourStart = new Date();

    if (hourStart.getHours() < 8 || hourStart.getHours() > 17) {
      return res.status(400).json({ error: 'You cannot start in this hour' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const orders = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(hourStart), endOfDay(hourStart)],
        },
        deliveryman_id: req.params.id,
      },
    });

    if (orders.length >= 5) {
      return res
        .status(400)
        .json({ error: 'O limite de retiradas diárias já foi alcançado' });
    }

    const updatedOrder = await order.update({ start_date: hourStart });

    return res.json(updatedOrder);
  }
}

export default new StartDateOrderController();
