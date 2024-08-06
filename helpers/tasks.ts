import Task from "../models/task";
import TaskCompletion from "../models/taskCompletion";

export const allTasks = async (): Promise<{
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

export const completedTasks = async (
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

export const taskData = async (
  id: string
): Promise<{ status: number; task?: typeof Task }> => {
  try {
    const task = await Task.findById(id);
    if (!task) return { status: 404 };
    return { status: 200, task };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const createTask = async ({
  title,
  description,
  image,
  sponsor,
  reward,
  url,
}: {
  title: string;
  description: string;
  image: string;
  sponsor: string;
  url: string;
  reward: number;
}): Promise<200 | 500> => {
  try {
    const task = new Task({
      title,
      description,
      image,
      sponsor,
      reward,
      url,
    });
    task.save();

    return 200;
  } catch (error) {
    return 500;
  }
};

export const deleteTask = async (id: string): Promise<200 | 500> => {
  try {
    await Task.findByIdAndDelete(id);
    return 200;
  } catch (error) {
    return 500;
  }
};

export const editTask = async ({
  id,
  image,
  description,
  title,
  reward,
  url,
  valid,
  sponsor,
}: {
  id: string;
  image?: string;
  description?: string;
  title?: string;
  reward?: number;
  url?: string;
  valid?: boolean;
  sponsor?: string;
}): Promise<200 | 500> => {
  try {
    await Task.findByIdAndUpdate(id, {
      image,
      reward,
      title,
      description,
      sponsor,
      url,
    });

    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
};
