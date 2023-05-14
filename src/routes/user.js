import { Router } from "express";
import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";

const router = Router();

////////////////////////////////////////////////////////////////////////////////
// USERS

router.get("", async (req, res) => {
  const users = await models.User.findAll({ raw: true });
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await models.User.findAll({
    where: {
      id: { [Op.eq]: userId },
    },
  });
  return res.send(user);
});

router.post("", async (req, res) => {
  const username = req.body.username;
  const newUser = await models.User.create({
    username,
  });
  return res.send(newUser);
});

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const username = req.body.username;
  await models.User.update(
    { username },
    { where: { id: { [Op.eq]: userId } } }
  );
  const updatedUser = await models.User.findAll({
    where: {
      id: { [Op.eq]: userId },
    },
  });
  return res.send(updatedUser);
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  await models.User.destroy({ where: { id: { [Op.eq]: userId } } });
  return res.send(`DELETE HTTP method on users/${userId} resource complete`);
});

export default router;
