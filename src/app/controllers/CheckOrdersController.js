import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class CheckOrderController {
  /**
   * 1. Visualizar encomendas
  Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados).
  Essa funcionalidade deve retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas;
  Permita também que ele liste apenas as encomendas que já foram entregues por ele, com base em seu ID de cadastro;
  Exemplo de requisição: GET https://fastfeet.com/deliveryman/1/deliveries
  */

  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
        },
      ],
    });

    return res.json(orders);
  }
}

export default new CheckOrderController();
