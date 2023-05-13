import session from "./session.js";
import user from "./user.js";
import message from "./message.js";

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send(`Please specify a resource`);
});

export default {
  router,
  session,
  user,
  message,
};
