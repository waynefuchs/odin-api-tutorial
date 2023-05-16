import models, { sequelize } from "../models/postgres/index.js";
import { Router } from "express";
import doesUserExist from "../util/user.js";
import ResponseCode from "../ResponseCode.js";
import { requireUserLogin } from "./login.js";

const router = Router();

// Get (all)
// No login required
router.get("/", async (req, res) => {
  const messages = await models.Message.findAll({ raw: true });
  ResponseCode.success(req, res, messages);
});

// Get (specific message)
// No login required
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (!doesUserExist({ id: userId })) return ResponseCode.noUserFound(req, res);
  const messages = await models.Message.findAll({ where: { userId: userId } });
  return ResponseCode.success(req, res, messages);
});

// Create
// Login required
router.post("/", requireUserLogin, async (req, res) => {
  let newMessage;
  try {
    newMessage = await models.Message.create({
      text: req.body.text,
      userId: req.user.id,
    });
  } catch (err) {
    newMessage = undefined;
  }

  if (!newMessage) return ResponseCode.malformedQuery(req, res);
  return ResponseCode.success(req, res, newMessage);
});

// Update
// Login required
// Same User Required (ignoring for now because this isn't a real API)
router.put("/:messageId", requireUserLogin, async (req, res) => {
  let updatedMessage;
  try {
    // Update the message
    await models.Message.update(
      { text: req.body.text },
      { where: { id: req.params.messageId } }
    );
    // Select the updated message
    updatedMessage = await models.Message.findOne({
      where: { id: req.params.messageId },
    });
  } catch (err) {
    updatedMessage = undefined;
  }
  if (!updatedMessage) return ResponseCode.malformedQuery(req, res);
  ResponseCode.success(req, res, updatedMessage);
});

// Delete
// Login required
// Same User Required (ignoring for now because this isn't a real API)
router.delete("/:messageId", requireUserLogin, async (req, res) => {
  try {
    await models.Message.destroy({ where: { id: req.params.messageId } });
    ResponseCode.deleted(req, res);
  } catch (err) {
    return ResponseCode.malformedQuery(req, res);
  }
});

export default router;
