import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/postgres/index.js";
import seedDB from "./seeddb.js";
import { passport } from "./routes/login.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE

// Set up session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", routes.router);
app.use("/login", routes.login);
app.use("/logout", routes.logout);
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
