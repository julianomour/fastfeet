import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  // async update(req, res) {
  //   const schema = Yup.object().shape({
  //     name: Yup.string(),
  //     email: Yup.string().email(),
  //     oldPassword: Yup.string().min(6),
  //     password: Yup.string()
  //       .min(6)
  //       .when('oldPassword', (oldPassword, field) =>
  //         oldPassword ? field.required() : field
  //       ),
  //     confirmPassword: Yup.when('password', (password, field) =>
  //       password ? field.required().oneOf([Yup.ref('password')]) : field
  //     ),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const { email, oldPassword } = req.body;
  //   const user = await Recipient.findByPk(req.userId);

  //   if (email && email !== user.email) {
  //     const recipientExists = await Recipient.findOne({ where: { email } });
  //     if (recipientExists) {
  //       return res.status(400).json({ error: 'User already exists' });
  //     }
  //   }

  //   if (oldPassword && !(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({ error: "Password doesn't match" });
  //   }

  //   const { id, name, provider } = await user.update(req.body);

  //   return res.json({ id, name, email, provider });
  // }
}
export default new RecipientController();
