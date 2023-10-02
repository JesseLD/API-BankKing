import { body } from "express-validator";

export const validateSignup = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("The password must be at least 6 characters"),
  body("name").isString().withMessage("Invalid Name"),
  body("cpf_cnpj")
    .isString()
    .isLength({ min: 11 })
    .withMessage("Invalid CPF or CNPJ"),
];

export const validateSignin = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("The password must be at least 6 characters"),
];
