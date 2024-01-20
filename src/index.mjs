import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
  secret:'the dev'
}))
app.use(routes);

const loginMiddleWare = (req, res, next) => {
  console.log(`${req.url}- ${req.method}`);
  next();
};

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", {
    maxAge: 60000,
    signed: true
  });
  res.status(201).send({
    msg: "HELLO",
  });
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
