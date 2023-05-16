import { generateHash, validateHash } from "./util/hash.js";

async function seedDB(models) {
  let { hash, salt } = generateHash("alice");
  await models.User.create(
    {
      username: "alice",
      hash,
      salt,
      messages: [
        { text: "I wish I hadn’t cried so much!" },
        {
          text: "I shall be punished for it now, I suppose, by being drowned in my own tears! That will be a queer thing, to be sure! However, everything is queer to-day.",
        },
      ],
    },
    { include: [models.Message] }
  );

  ({ hash, salt } = generateHash("eaglet"));
  await models.User.create(
    {
      username: "eaglet",
      hash,
      salt,
      messages: [
        { text: "Speak English!" },
        {
          text: "I don't know the meaning of half those long words, and, what's more, I don't believe you do either!",
        },
      ],
    },
    { include: [models.Message] }
  );

  ({ hash, salt } = generateHash("rabbit"));
  await models.User.create(
    {
      username: "rabbit",
      hash,
      salt,
      messages: [
        {
          text: "The Duchess! The Duchess! Oh my dear paws! Oh my fur and whiskers! She'll get me executed, as sure as ferrets are ferrets!",
        },
      ],
    },
    { include: [models.Message] }
  );

  ({ hash, salt } = generateHash("caterpillar"));
  await models.User.create(
    {
      username: "caterpillar",
      hash,
      salt,
      messages: [{ text: "Who are you?" }],
    },
    { include: [models.Message] }
  );
}

export default seedDB;
