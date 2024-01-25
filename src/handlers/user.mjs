import { matchedData, validationResult } from "express-validator";
import { mockUser } from "../utils/constants.mjs";
import { hashPassword } from "../utils/helpers.mjs";

export const getUserById = (req, res) => {
  const { findUserByIndex } = req;
  const findUser = mockUser[findUserByIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
};

export const createUserHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  data.password = hashPassword(data.password);
//   const newUser = new User(data);

//   try {
//     const saveUser = await newUser.save();
//     return res.status(201).send(saveUser);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(400);
//   }
};
