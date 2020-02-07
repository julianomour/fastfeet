import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    console.log('TCL: NewOrderMail -> handle -> data', data);
    const { deliveryman, product, deliveryman_email } = data;

    await Mail.sendMail({
      to: `${deliveryman} <${deliveryman_email}>`,
      subject: 'Nova encomenta para você entregar',
      template: 'newOrder',
      context: { product, deliveryman },
    });
  }
}

export default new NewOrderMail();
