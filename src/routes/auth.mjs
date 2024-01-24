import { Router } from "express";
import passport from "passport";

// app.post("/api/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;

//   const findUser = mockUser.find((user) => user?.username === username);
//   if (!findUser)
//     return res.status(400).send({
//       msg: "BAD CREDENTIALS",
//     });

//    req.session.user = findUser;
//    return res.send(findUser).status(200)
// });

// app.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log(session)
//   })
//   return req.session.user ? res.status(200).send(req.session.user) : res.status(400).send({
//     msg: "Not Authenticated"
//   })
// })

// app.post("/api/cart", (req, res) => {
//   if(!req.session.user) return res.sendStatus(400)
//   const {body : item} = req
//   const {cart} = req.session

//   if(cart) {
//     cart.push(item)
//   } else {
//     req.session.cart = [item];
//   }

//   return res.status(200).send(item)

// })

// app.get("/api/cart", (req, res) => {
//   if(!req.session.user) return res.sendStatus(400);

//   return res.send(req.session.cart ?? []);

// })

const router = Router();

router.post("/api/auth", passport.authenticate('local'), (req, res) => {
  return res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  console.log("Inside /auth/status endpoint");
  console.log(req.user);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

//logout
router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    return res.sendStatus(200);
  });
});

export default router;
