export interface ITask {
    id: string
    title: string
    description: string
    status: string
    tags: string[] | []
    dueDate: string | null
    priorityOrder: number
    createdAt: Date | string
    updatedAt: Date | string
    category?: {
        id?: string
        title?: string
        priorityOrder?: number
        createdAt?: string
        updatedAt?: string
    }
}

export interface ITag {
    tagTitle: string
    tagColor: string
}
export interface ITaskFilter {
    type: string
    value: string
}

export interface ITaskDetails extends Partial<ITask> {}

export interface ITaskCreateDTO {
    categoryId: string

    title: string
    description: string | undefined
    status?: string | undefined
    dueDate?: Date | undefined
    priorityOrder?: number | undefined
}

export interface ITaskUpdateDTO extends Partial<ITaskCreateDTO> {
    id: string
}

export interface ITaskChangeResponse {
    message: string
}

export const enum TaskStatus {
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    INPROGRESS = 'INPROGRESS',
    REVIEW = 'REVIEW',
    DONE = 'DONE',
}
