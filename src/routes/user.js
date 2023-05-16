import { Router } from "express";
import { Op } from "sequelize";
import models, { sequelize } from "../models/postgres/index.js";
import { generateHash } from "../util/hash.js";
import { requireUserLogin } from "./login.js";

const router = Router();

// Get (all)
// No login required
router.get("", async (req, res) => {
  const users = await models.User.findAll({
    attributes: ["id", "username"],
    raw: true,
  });

  res.send(users);
});

// Get (user)
// No login required
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await models.User.findOne({
    attributes: ["id", "username"],
    where: {
      id: { [Op.eq]: userId },
    },
  });

  if (!user) {
    res.status(404);
    return res.send("No user found");
  }

  res.send(user);
});

// Create
// Login required
router.post("", requireUserLogin, async (req, res) => {
  const username = req.body.username;
  const { hash, salt } = generateHash("rabbit");

  // Client error
  if (!username) {
    res.status(401);
    return res.send("Malformed query");
  }

  // Server takes responsibility
  if (!hash || !salt) {
    res.status(500);
    return res.send("Internal server error");
  }

  // Create the object in postgresql
  let newUser;
  try {
    newUser = await models.User.create({
      username,
      hash,
      salt,
    });
  } catch (err) {
    newUser = undefined;
  }

  if (!newUser) {
    res.status(401);
    return res.send("Malformed query");
  }

  // Return a success code and the created user object
  res.status(201);
  res.send({ id: newUser.id, username: newUser.username });
});

// Update (specific user)
// Login required
router.put("/:userId", requireUserLogin, async (req, res) => {
  const userId = req.params.userId;
  const username = req.body.username;

  // Perform the update
  await models.User.update(
    { username },
    { where: { id: { [Op.eq]: userId } } }
  );

  // Select the user
  const updatedUser = await models.User.findOne({
    attributes: ["id", "username"],
    where: {
      id: { [Op.eq]: userId },
    },
  });

  // Error out if the user doesn't exist
  if (!updatedUser) {
    res.status(404);
    return res.send("User not found");
  }

  // Return the update user json
  res.send(updatedUser);
});

// Delete (specific user)
// Login required
router.delete("/:userId", requireUserLogin, async (req, res) => {
  const userId = req.params.userId;

  try {
    await models.User.destroy({ where: { id: { [Op.eq]: userId } } });
  } catch (err) {
    res.status(401);
    return res.send("Malformed query");
  }

  res.status(204);
  res.end();
});

export default router;
