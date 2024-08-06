import express, { response } from "express";
import { createAccount, getProfile } from "./helpers/user";
import { allTasks, completedTasks } from "./helpers/tasks";

const app = express();

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getProfile(id);

  return res.json(user);
});

app.post("/user/create", async (req, res) => {
  const { tgId } = req.body();
  const response = await createAccount({ tgId });
  return res.json(response);
});

// app.post("/bot/message", async (req, res) => {

// });

app.get("tasks", async (req, res) => {
  const { telegramId } = req.body();

  const all = await allTasks();
  const taskCompletion = await completedTasks(telegramId);

  return { all, taskCompletion };
});

app.post("tasks/:id", async (req, res) => {
  const;
});
