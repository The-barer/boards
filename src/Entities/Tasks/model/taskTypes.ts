export interface ITask {
    id: string
    title: string
    description: string
    status: string
    dueDate: Date | null
    priorityOrder: number
    createdAt: Date | string
    updatedAt: Date | string
    category?: {
        id: string
        title: string
        priorityOrder: number
        createdAt: string
        updatedAt: string
    }
}

export interface ITaskCreateDTO {
    boardId: string

    title: string
    description?: string | undefined
    status?: string | undefined
    dueDate?: number | null
    priorityOrder?: number | undefined
}

export interface ITaskUpdateDTO extends Partial<ITaskCreateDTO> {
    id: string
}

export interface ITaskChangeResponse {
    message: string
}

export const enum TaskStatus {
    BACKLOG = 'backlog',
    TODO = 'todo',
    INPROGRESS = 'inprogress',
    REVIEW = 'review',
    DONE = 'done',
}
