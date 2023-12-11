import todoAppServer from "../../../Shared/Api/axiosInstance.api";
import {
  ITask,
  ITaskCreate,
  ITaskUpdate,
  ITaskUpdateResponse,
} from "../model/task.types";

export async function createTask(createTaskData: ITaskCreate): Promise<ITask> {
  const { id, ...taskData } = createTaskData;
  return await todoAppServer.post(`task/${id}`, taskData);
}

export async function getTask(id: number): Promise<ITask> {
  return await todoAppServer.get(`task/${id}`);
}

export async function getAllTasks(): Promise<ITask[]> {
  return await todoAppServer.get(`task/`);
}

export async function updateTask(
  updateTaskData: ITaskUpdate
): Promise<ITaskUpdateResponse> {
  const { id, ...taskData } = updateTaskData;
  return await todoAppServer.patch(`task/${id}`, taskData);
}

export async function deleteTask(id: number): Promise<ITaskUpdateResponse> {
  return await todoAppServer.delete(`task/${id}`);
}
