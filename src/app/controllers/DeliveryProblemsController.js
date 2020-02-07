import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblem';
import Order from '../models/Order';

class DeliveryProblem {
  async index(req, res) {
    const delivery_problems = await DeliveryProblems.findAll();

    return res.json(delivery_problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    await DeliveryProblems.create({ description, delivery_id: req.params.id });

    return res.json({ message: 'Problem Registered' });
  }

  async delete(req, res) {
    const problem = await DeliveryProblems.findByPk(req.params.id);

    if (!problem) {
      return res.status(400).json({ error: 'sProblem not found' });
    }

    const order = await Order.findOne({ where: { id: problem.delivery_id } });

    await order.update({ canceled_at: new Date() });

    await problem.destroy();

    return res.json({ message: 'Delivery Canceled' });
  }
}

export default new DeliveryProblem();
