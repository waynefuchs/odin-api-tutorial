import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

////////////////////////////////////////////////////////////////////////////////
// MESSAGES

router.get("/", (req, res) => {
  console.log("Messages rendering");
  const messages = req.context.models.messages;
  return res.send(Object.values(messages));
});

router.get("/:userId", (req, res) => {
  const messages = req.context.models.messages;
  return res.json(messages[req.params.userId]);
});

router.post("/", (req, res) => {
  const id = uuidv4();
  const messages = req.context.models.messages;
  const sessionUserId = req.context.me.id;
  const message = {
    id,
    text: req.body.text,
    userId: sessionUserId,
  };
  messages[id] = message;
  return res.send(message);
});

router.delete("/:messageId", (req, res) => {
  const { [req.params.messageId]: messageToDelete, ...otherMessages } =
    req.context.models.messages;
  req.context.models.messages = otherMessages;
  return res.send(messageToDelete);
});

export default router;
