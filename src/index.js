import "dotenv/config";
import cors from "cors";
import express from "express";

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "Goodbye World",
    userId: "2",
  },
};

const app = express();

app.use(cors());

// USERS

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/users/:userId", (req, res) => {
  return res.json(users[req.params.userId]);
});

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

// MESSAGES
app.get("/messages", (req, res) => {
  return res.json(Object.values(messages));
});

app.get("/messages/:userId", (req, res) => {
  return res.json(messages[req.params.userId]);
});

// SERVER START
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
