import { Request, Response } from "express";
import { User, Wallet, UserData } from "../Model/User";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
class UserController {
  async index(request: Request, response: Response) {
    const users = await User.findAll({
      include: [{ model: Wallet }, { model: UserData }],
    });

    response.json({ users });
  }

  async signup(request: Request, response: Response) {
    const errors = validationResult(request);

    if (errors.isEmpty()) {
      const { name, email, password, cpf_cnpj } = request.body;
      const exists = await User.findOne({ where: { email: email } });
      let type;
      cpf_cnpj.length > 11 ? (type = "PJ") : (type = "PF");

      if (exists) {
        response.json({ error: "User already exists" });
      } else {
        const uuid = await uuidv4();
        const hashedPassword = await bcryptjs.hash(password, 10);

        try {
          const newUser = await User.create({
            uuid: uuid,
            name: name,
            password: hashedPassword,
            email: email,
          });

          const newWallet = await Wallet.create({
            user_id: newUser.id,
            balance: 0,
          });

          await UserData.create({
            user_id: newUser.id,
            cpf_cnpj: cpf_cnpj,
            user_type: type,
            wallet_id: newWallet.id,
          });
          response.json({ success: "User created successfully" });
        } catch (err) {
          response.sendStatus(500);
          console.log(err);
        }
      }
    } else {
      response.status(400).json({ errors });
    }
  }

  async signin(request: Request, response: Response) {
    const errors = validationResult(request);

    if (errors.isEmpty()) {
      const { email, password } = request.body;

      const exists = await User.findOne({ where: { email: email } });
      if (exists) {
        if (await bcryptjs.compare(password, exists.password)) {
          const payload = { uuid: exists.uuid, expiresIn: 1000 };
          const token = jwt.sign(payload, process.env.SECRET_KEY as string);
          response.send(token);
        } else {
          response.sendStatus(400);
        }
      } else {
        response.status(404).json({ error: "User not found!" });
      }
    } else {
      response.status(400).json({ errors });
    }
  }

  async fillData(request: Request, response: Response) {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      const { uuid, cpf_cnpj } = request.body;

      const user = await User.findOne({ where: { uuid: uuid } });
      let type = "PF";
      if (cpf_cnpj.length > 11) {
        type = "PJ";
      }
      if (user) {
        UserData.create({
          user_id: user.id,
          cpf_cnpj: cpf_cnpj,
          type: type,
          wallet_id: user.id,
        });
        response.json({ success: "Data saved!" });
      } else {
        response.status(404).json({ error: "User not found!" });
      }
    } else {
      response.status(400).json({ errors });
    }
  }
}

export default new UserController();
