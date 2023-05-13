import { Router } from "express";

const router = Router();

////////////////////////////////////////////////////////////////////////////////
// USERS

router.get("/users", (req, res) => {
  const users = req.context.models.users;
  return res.send(Object.values(users));
});

router.get("/users/:userId", (req, res) => {
  const users = req.context.models.users;
  return res.json(users[req.params.userId]);
});

router.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

router.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

router.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

export default router;
