export interface ITask {
    id: string
    title: string
    description: string
    status: string
    dueDate: Date | null
    priorityOrder: number
    createdAt: Date
    updatedAt: Date
    category?: {
        id: string
        title: string
        priorityOrder: number
        createdAt: string
        updatedAt: string
    }
}

export interface ITaskCreateDTO {
    title: string
    description?: string
    status?: string
    dueDate?: Date | null
    priorityOrder?: number
}

export interface ITaskUpdateDTO extends Partial<ITaskCreateDTO> {
    id: string
}

export interface ITaskChangeResponse {
    message: string
}

export enum TaskStatus {
    BACKLOG = 'backlog',
    TODO = 'todo',
    INPROGRESS = 'inprogress',
    REVIEW = 'review1',
    DONE = 'done',
}
