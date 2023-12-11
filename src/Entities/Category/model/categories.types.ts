export interface ICategory {
  id: number;
  title: string;
  priorityOrder: 1;
  createdAt: string;
  updatedAt: string;
  tasks?: {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date | null;
    priorityOrder: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
