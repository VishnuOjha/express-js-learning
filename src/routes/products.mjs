import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log("sign",req.signedCookies.hello);
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    {res.send([
      {
        id: 1,
        productName: "NIKE AIR FORCE 1",
        price: 100,
      },
    ]);} else {
        res.sendStatus(400)
    }
});

export default router;
