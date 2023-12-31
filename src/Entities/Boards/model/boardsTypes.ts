export interface IBoard {
    id: string
    title: string
    priorityOrder: number
    createdAt: string
    updatedAt: string
    tasks?: {
        id: string
        title: string
        description: string
        status: string
        dueDate: Date | null
        priorityOrder: number
        createdAt: Date
        updatedAt: Date
    }[]
}

export interface ICategoryCreateDTO {
    title: string
    priorityOrder?: number
}

export interface ICategoryUpdateDTO extends Partial<ICategoryCreateDTO> {}

export interface ICategoryChangeResponse {
    message: string
}
