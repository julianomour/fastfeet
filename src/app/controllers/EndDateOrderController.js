import * as Yup from 'yup';

import Order from '../models/Order';
import File from '../models/File';

class EndDateOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      file: Yup.file().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { originalname: name, filename: path } = req.file;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const file = await File.create({ name, path });

    const updatedOrder = await order.update({
      end_date: new Date(),
      signature_id: file.id,
    });

    return res.json(updatedOrder);
  }
}

export default new EndDateOrderController();
