import express, { response } from "express";
import { createAccount, getProfile } from "./helpers/user";

const app = express();

app.get("/user/:id", async (req, res) => {
  const { tgId } = req.body();
  const user = await getProfile(tgId);

  return res.json(user);
});

app.post("/user/create", async (req, res) => {
  const { tgId } = req.body();
  const response = await createAccount({ tgId });
  return res.json(response);
});

app.post("/bot/message", async (req, res) => {});
