import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";
import UserSerializer from "../../../serializers/userSerializer.js";

const usersRouter = new express.Router();

usersRouter.get("/:id", async (req, res) => {
  const { user } = req;
  try {
    const serializedUser = await UserSerializer.getProfileDetails(user);
    return res.status(200).json({ user: serializedUser });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
