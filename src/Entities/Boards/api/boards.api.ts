import { CATEGORIES_TAG, baseApi } from '@/Shared/Api'
import {
    IBoard,
    ICategoryChangeResponse,
    ICategoryCreateDTO,
    ICategoryUpdateDTO,
} from '../model/boardsTypes'

export const boardsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCategory: build.mutation<IBoard, ICategoryCreateDTO>({
            query: (body) => ({
                url: `/category`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [CATEGORIES_TAG],
        }),

        updateCategory: build.mutation<
            ICategoryChangeResponse,
            { id: string; body: ICategoryUpdateDTO }
        >({
            query: ({ id, body }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [CATEGORIES_TAG],
        }),

        deleteCategory: build.mutation<ICategoryChangeResponse, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [CATEGORIES_TAG],
        }),

        getDetailedCategory: build.query<IBoard, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: [CATEGORIES_TAG],
        }),

        getAllCategories: build.query<IBoard[], void>({
            query: () => ({
                url: `/category`,
                method: 'GET',
            }),
            providesTags: [CATEGORIES_TAG],
        }),
    }),
})

export const {
    useGetAllCategoriesQuery,
    useGetDetailedCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = boardsApi
