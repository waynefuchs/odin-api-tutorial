import { Router } from "express";

const router = Router();

////////////////////////////////////////////////////////////////////////////////
// SESSION

router.get("/", (req, res) => {
  const userList = req.context.models.users;
  const sessionUserId = req.context.me.id;
  return res.send(userList[sessionUserId]);
});

export default router;
