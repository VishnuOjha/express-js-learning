import { mockUser } from "./constants.mjs";

export const resolveIndexByUser = (req, res, next) => {
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