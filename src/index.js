import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/postgres/index.js";

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
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

////////////////////////////////////////////////////////////////////////////////
// SERVER START

const eraseDatabaseOnSync = false;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) createUsersWithMessages();
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "alice",
      messages: [
        { text: "I wish I hadn’t cried so much!" },
        {
          text: "I shall be punished for it now, I suppose, by being drowned in my own tears! That will be a queer thing, to be sure! However, everything is queer to-day.",
        },
      ],
    },
    { include: [models.Message] }
  );
  await models.User.create(
    {
      username: "eaglet",
      messages: [
        { text: "Speak English!" },
        {
          text: "I don't know the meaning of half those long words, and, what's more, I don't believe you do either!",
        },
      ],
    },
    { include: [models.Message] }
  );
  await models.User.create(
    {
      username: "rabbit",
      messages: [
        {
          text: "The Duchess! The Duchess! Oh my dear paws! Oh my fur and whiskers! She'll get me executed, as sure as ferrets are ferrets!",
        },
      ],
    },
    { include: [models.Message] }
  );
  await models.User.create(
    {
      username: "caterpillar",
      messages: [{ text: "Who are you?" }],
    },
    { include: [models.Message] }
  );
};
