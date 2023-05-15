import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/postgres/index.js";
import seedDB from "./seeddb.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE

app.use((req, res, next) => {
  req.context = {
    me: {
      id: 1,
      username: "alice",
      createdAt: "2023-05-14T09:37:10.819Z",
      updatedAt: "2023-05-14T09:37:10.819Z",
    },
  };

  next();
});

// Routes
app.use("/", routes.router);
app.use("/login", routes.login);
app.use("/messages", routes.message);
app.use("/users", routes.user);
app.use("/session", routes.session);

////////////////////////////////////////////////////////////////////////////////
// SERVER START

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) seedDB(models);
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
