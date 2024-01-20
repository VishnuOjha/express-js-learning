import express, { response } from "express";
import { query, validationResult, body, matchedData } from "express-validator";

const app = express();

app.use(express.json());

const loginMiddleWare = (req, res, next) => {
  console.log(`${req.url}- ${req.method}`);
  next();
};

const resolveIndexByUser = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserByIndex = mockUser.findIndex((user) => user?.id === parsedId);
  if (findUserByIndex === -1) return res.sendStatus(400);
  req.findUserByIndex = findUserByIndex;
  next();
};

const PORT = process.env.PORT || 5000;

const mockUser = [
  { id: 1, username: "john", displayName: "John" },
  { id: 2, username: "kent", displayName: "Kent" },
  { id: 3, username: "clark", displayName: "Clark" },
  { id: 4, username: "rose", displayName: "Rose" },
  { id: 5, username: "maria", displayName: "Maria" },
  { id: 6, username: "rock", displayName: "Rock" },
  { id: 7, username: "anna", displayName: "Anna" },
  { id: 8, username: "bruce", displayName: "Bruce" },
  { id: 9, username: "stark", displayName: "Stark" },
  { id: 10, username: "emma", displayName: "Emma" },
];

app.get("/", (req, res) => {
  res.status(201).send({
    msg: "HELLO",
  });
});

app.get(
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

// post request
app.post(
  "/api/addUsers",
  [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("username can not be empty")
      .isLength({
        min: 5,
        max: 32,
      })
      .withMessage(
        "username must be at least 5 characters with a max of 32 characters"
      ),
    body("displayName")
      .isString()
      .notEmpty()
      .withMessage("displayName can not be empty")
      .isLength({
        min: 5,
        max: 32,
      })
      .withMessage(
        "displayName must be at least 5 characters with a max of 32 characters"
      ),
  ],
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty())
      return res.status(400).send({
        errors: result.array(),
      });
    const { body } = req;
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body };
    mockUser.push(newUser);
    return res.status(201).send(newUser);
  }
);

// with request parameters
app.get("/api/users/:id", resolveIndexByUser, (req, res) => {
  const { findUserByIndex } = req;
  const findUser = mockUser[findUserByIndex];
  if (!findUser) return response.status(404);
  return res.send(findUser);
});

// put request
app.put("/api/updateUser/:id", resolveIndexByUser, (req, res) => {
  const { body, findUserByIndex } = req;
  mockUser[findUserByIndex] = { id: mockUser[findUserByIndex].id, ...body };
  return res.sendStatus(200);
});

// patch request
app.patch("/api/updateUserDetails/:id", resolveIndexByUser, (req, res) => {
  const { body, findUserByIndex } = req;
  mockUser[findUserByIndex] = { ...mockUser[findUserByIndex], ...body };
  return res.sendStatus(200);
});

// delete request
app.delete("/api/deleteUser/:id", resolveIndexByUser, (req, res) => {
  const { findUserByIndex } = req;
  mockUser.splice(findUserByIndex, 1);
  return res.sendStatus(200);
});

// get products
app.get("/api/products", (req, res) => {
  res.send([
    {
      id: 1,
      productName: "NIKE AIR FORCE 1",
      price: 100,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`App is Running on ${PORT} ....`);
});
