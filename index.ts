import express, { response } from "express";
import {
  createAccount,
  getProfile,
  getReferrals,
  updateScore,
} from "./helpers/user";
import {
  allTasks,
  completedTasks,
  deleteTask,
  editTask,
  taskData,
} from "./helpers/tasks";

const app = express();

app.get("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getProfile(id);

  return res.json(user);
});

app.get("/user/:id/referrals", async (req, res) => {
  const response = await getReferrals({
    telegramId: parseInt(req.params.id),
  });

  res.json(response);
});

app.post("/user/create", async (req, res) => {
  const { tgId, referredBy } = req.body();
  const response = await createAccount({ tgId, referredBy });
  return res.json(response);
});

// app.post("/bot/message", async (req, res) => {

// });

app.get("/tasks", async (req, res) => {
  const { telegramId } = req.body();

  const all = await allTasks();
  const taskCompletion = await completedTasks(telegramId);

  return { all, taskCompletion };
});

app.post("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await taskData(id);

  return res.json({ status: task.status, data: task.task });
});

app.post("/task/:id/edit", async (req, res) => {
  const id = req.params.id;
  const { title, description, sponsor, reward, url, valid, image } = req.body();

  const response = await editTask({
    id,
    title,
    description,
    url,
    sponsor,
    image,
    valid,
    reward,
  });

  return res.json({
    status: response,
    message:
      response == 200 ? "Task has been updated" : "Failed to update task",
  });
});

app.post("/task/:id/delete", async (req, res) => {
  const id = req.params.id;
  const clearTask = await deleteTask(id);
  return res.json({ status: clearTask });
});

app.post("/score/add/:id", async (req, res) => {
  const telegramId = parseInt(req.params.id);
  const { points, action } = req.body();

  const response = await updateScore({ telegramId, points, action });

  return res.json({ status: response });
});
