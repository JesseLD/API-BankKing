import { Request, Response } from "express";
import { User } from "../Model/User";

class UserController {
  async index(request: Request, response: Response) {
    const users = await User.findAll();

    response.json({ users });
  }
}

export default new UserController();
