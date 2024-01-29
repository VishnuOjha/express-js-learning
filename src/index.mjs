import mongoose from "mongoose";
import { createApp } from "./createApp.mjs";

const app = createApp();

mongoose
  .connect("mongodb://localhost/express_tuts")
  .then(() => console.log("CONNECT to DATABASE....."))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is Running on ${PORT} ....`);
});
