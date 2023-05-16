import models, { sequelize } from "../models/postgres/index.js";
import { Router } from "express";
import doesUserExist from "../util/user.js";
import { requireUserLogin } from "./login.js";

const router = Router();

// Get (all)
// No login required
router.get("/", async (req, res) => {
  const messages = await models.Message.findAll({ raw: true });
  return res.send(messages);
});

// Get (specific message)
// No login required
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!doesUserExist({ id: userId })) {
    res.status(401);
    return res.send("Malformed query");
  }
  const messages = await models.Message.findAll({
    where: { userId: userId },
  });
  return res.json(messages);
});

// Create
// Login required
router.post("/", async (req, res) => {
  const userId = req.context.me.id;
  const text = req.body.text;
  const newMessage = await models.Message.create({
    text,
    userId,
  });
  return res.send(newMessage);
});

// Update
// Login required
// Same User Required
router.put("/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  const text = req.body.text;
  await models.Message.update({ text }, { where: { id: messageId } });
  const updatedMessage = await models.Message.findAll({
    where: { id: { [Op.eq]: messageId } },
  });
  return res.send(updatedMessage);
});

// Delete
// Login required
// Same User Required
router.delete("/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  await models.Message.destroy({ where: { id: messageId } });
  return res.send(
    `DELETE HTTP method on messages/${messageId} resource complete`
  );
});

export default router;
