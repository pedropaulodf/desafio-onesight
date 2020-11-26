import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { registerValidate, loginValidate } from "./validate.js";

const userController = {
  register: async (req, res) => {
    const { error } = registerValidate(req.body);

    if (error) {
      res.status(400).send(error.message);
    }

    const selectedUser = await UserModel.findOne({ email: req.body.email });

    if (selectedUser) {
      return res.status(400).send("Usuario ja existe");
    }

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  login: async (req, res) => {
    
    const { error } = loginValidate(req.body);

    if (error) {
      res.status(400).send(error.message);
    }

    const selectedUser = await UserModel.findOne({ email: req.body.email });


    if (!selectedUser) {
      return res.status(400).send("Usuario ou senha incorreto(s)");
    }

    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      selectedUser.password
    );

    if (!passwordAndUserMatch) {
      return res.status(400).send("Usuario ou senha incorreto(s)");
    }

    const token = jwt.sign(
      { _id: selectedUser._id, admin: selectedUser.admin },
      process.env.TOKEN_SECRET
    );

    res.header("authorization-token", token);
    res.send("Usuario logado");
  },
};

export default userController;
