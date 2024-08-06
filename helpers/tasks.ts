import Task from "../models/task";
import TaskCompletion from "../models/taskCompletion";

const all = async (): Promise<{
  status: number;
  tasks?: (typeof Task)[];
}> => {
  try {
    const allAvailableTasks = await Task.find({ valid: true });
    if (!allAvailableTasks) return { status: 404, tasks: allAvailableTasks };
    return { status: 200, tasks: allAvailableTasks };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

const completed = async (
  telegramId: number
): Promise<{ status: number; tasks?: (typeof TaskCompletion)[] }> => {
  try {
    const done = await TaskCompletion.find({ userId: telegramId });
    if (!done) return { status: 404 };
    return { status: 200, tasks: done };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

// const undone = async (
//   telegramId: number
// ): Promise<{ string: number; tasks?: (typeof Tasks)[] }> => {
//   try {
//     const done = await completed(telegramId);
//     const allTasks = await all();

//     const doneSet = new Set(done.tasks);
//     const tasks = allTasks?.tasks?.filter((task) => done?.tasks?.taskId);

//     return tasks;
//   } catch (error) {}
// };

module.exports = {
  tasks: { all, completed },
};
