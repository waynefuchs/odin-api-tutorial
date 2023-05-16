import models, { sequelize } from "../models/postgres/index.js";

function doesUserExist(user) {
  if (!user) return false;

  // Search by username
  if (user.username) {
    const res = models.User.findOne({ where: { username: user.username } });
    if (!res) return false;
    return true;
  }

  // Search by id
  if (user.id) {
    const res = models.User.findOne({ where: { id: user.id } });
    if (!res) return false;
    return true;
  }

  // false if no username or id was specified
  return false;
}

export default doesUserExist;
