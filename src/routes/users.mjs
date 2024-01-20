import { Router } from "express";
import {
  validationResult,
  query,
  checkSchema,
  matchedData,
} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { resolveIndexByUser } from "../utils/middlewares.mjs";
import { mockUser } from "../utils/constants.mjs";

const router = Router();

// user get request
router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters."),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { value, filter },
    } = req;
    // when filter & value are undefined
    if (filter && value) {
      const userData = mockUser.filter((user) => user[filter].includes(value));
      const result = res.send(userData);
      return result;
    }
    return res.send(mockUser);
  }
);

// user post request
router.post(
  "/api/addUsers",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty())
      return res.status(400).send({
        errors: result.array(),
      });

    const data = matchedData(req);

    console.log(data);
    const { body } = req;
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
    mockUser.push(newUser);
    return res.status(201).send(newUser);
  }
);

// put request
router.put("/api/updateUser/:id", resolveIndexByUser, (req, res) => {
  const { body, findUserByIndex } = req;
  mockUser[findUserByIndex] = { id: mockUser[findUserByIndex].id, ...body };
  return res.sendStatus(200);
});

// patch request
router.patch("/api/updateUserDetails/:id", resolveIndexByUser, (req, res) => {
  const { body, findUserByIndex } = req;
  mockUser[findUserByIndex] = { ...mockUser[findUserByIndex], ...body };
  return res.sendStatus(200);
});

// delete request
router.delete("/api/deleteUser/:id", resolveIndexByUser, (req, res) => {
  const { findUserByIndex } = req;
  mockUser.splice(findUserByIndex, 1);
  return res.sendStatus(200);
});

// with request parameters
router.get("/api/users/:id", resolveIndexByUser, (req, res) => {
  const { findUserByIndex } = req;
  const findUser = mockUser[findUserByIndex];
  if (!findUser) return response.status(404);
  return res.send(findUser);
});

export default router;
