import "dotenv/config";
import cors from "cors";
import express from "express";

import routes from "./routes/index.js";
import models from "./models/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };

  next();
});

// Routes
app.use("/", routes.router);
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

////////////////////////////////////////////////////////////////////////////////
// SERVER START
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
