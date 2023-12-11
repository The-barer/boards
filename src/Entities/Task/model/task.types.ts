export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date | null;
  priorityOrder: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: number;
    title: string;
    priorityOrder: number;
    createdAt: Date;
    updatedAt: Date;
  };
  user?: {
    id: string;
  };
}

export interface ITaskCreate {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date | null;
  priorityOrder: number;
  category: {
    id: number;
  };
}

export interface ITaskUpdate extends Partial<ITaskCreate> {
  id: number;
}

export interface ITaskUpdateResponse {
  message: string;
}
