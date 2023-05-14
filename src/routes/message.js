import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";
import { Router } from "express";

const router = Router();

////////////////////////////////////////////////////////////////////////////////
// MESSAGES

router.get("/", async (req, res) => {
  const messages = await models.Message.findAll({ raw: true });
  return res.send(messages);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const messages = await models.Message.findAll({
    where: { userId: { [Op.eq]: userId } },
  });
  return res.json(messages);
});

router.post("/", async (req, res) => {
  const userId = req.context.me.id;
  const text = req.body.text;
  const newMessage = await models.Message.create({
    text,
    userId,
  });
  return res.send(newMessage);
});

router.put("/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  const text = req.body.text;
  await models.Message.update(
    { text },
    { where: { id: { [Op.eq]: messageId } } }
  );
  const updatedMessage = await models.Message.findAll({
    where: { id: { [Op.eq]: messageId } },
  });
  return res.send(updatedMessage);
});

router.delete("/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  await models.Message.destroy({ where: { id: { [Op.eq]: messageId } } });
  return res.send(
    `DELETE HTTP method on messages/${messageId} resource complete`
  );
});

export default router;
