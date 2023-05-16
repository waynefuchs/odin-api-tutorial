import { Router } from "express";
import models, { sequelize } from "../models/postgres/index.js";
import { generateHash } from "../util/hash.js";
import { requireUserLogin } from "./login.js";
import ResponseCode from "../ResponseCode.js";

const router = Router();

// Get (all)
// No login required
router.get("", async (req, res) => {
  const users = await models.User.findAll({
    attributes: ["id", "username"],
    raw: true,
  });

  ResponseCode.success(req, res, users);
});

// Get (user)
// No login required
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await models.User.findOne({
    attributes: ["id", "username"],
    where: { id: userId },
  });

  if (!user) return ResponseCode.noUserFound(req, res);

  ResponseCode.success(req, res, user);
});

// Create
// Login required
router.post("", requireUserLogin, async (req, res) => {
  const username = req.body.username;
  const { hash, salt } = generateHash("rabbit");

  // check input
  if (!username) return ResponseCode.malformedQuery(req, res);
  if (!hash || !salt) return ResponseCode.internalServerError(req, res);

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
  if (!newUser) return ResponseCode.malformedQuery(req, res);

  // Send success code and the created user object
  ResponseCode.created(req, res, {
    id: newUser.id,
    username: newUser.username,
  });
});

// Update (specific user)
// Login required
router.put("/:userId", requireUserLogin, async (req, res) => {
  const userId = req.params.userId;
  const username = req.body.username;

  // Perform the update
  await models.User.update({ username }, { where: { id: userId } });

  // Select the user
  const updatedUser = await models.User.findOne({
    attributes: ["id", "username"],
    where: { id: userId },
  });

  // Error out if the user doesn't exist
  if (!updatedUser) return ResponseCode.noUserFound(req, res);

  // Return the update user json
  ResponseCode.updated(req, res, updatedUser);
});

// Delete (specific user)
// Login required
router.delete("/:userId", requireUserLogin, async (req, res) => {
  const userId = req.params.userId;

  try {
    await models.User.destroy({ where: { id: userId } });
  } catch (err) {
    return ResponseCode.malformedQuery(req, res);
  }

  ResponseCode.deleted(req, res);
});

export default router;
