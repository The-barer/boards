import { TASK_TAG, baseApi } from '@/Shared/Api'
import { ITask, ITaskChangeResponse, ITaskCreateDTO, ITaskUpdateDTO } from '../model/taskTypes'

export const taskApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation<ITask, ITaskCreateDTO>({
            query: ({ boardId, ...body }) => ({
                url: `/task/category/${boardId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [TASK_TAG],
        }),

        updateTask: build.mutation<ITaskChangeResponse, ITaskUpdateDTO>({
            query: ({ id, ...body }) => ({
                url: `/task/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [TASK_TAG],
        }),

        deleteTask: build.mutation<ITaskChangeResponse, string>({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TASK_TAG],
        }),

        getTask: build.query<ITask, string>({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'GET',
            }),
            providesTags: [TASK_TAG],
        }),

        getAllTasks: build.query<ITask[], string>({
            query: (boardId) => ({
                url: `/task/category/${boardId}`,
                method: 'GET',
            }),
            providesTags: [TASK_TAG],
        }),
    }),
})

export const {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useGetTaskQuery,
    useGetAllTasksQuery,
} = taskApi
