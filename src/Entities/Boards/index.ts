export { boardsSlice, boardDetails, boardsList, boardsIsEmpty } from './model/boardsSlice'
export { BoardItem } from './ui/BoardItem'
export type { IBoard } from './model/boardsTypes'
export { useAddBoard } from './model/useAddBoard'
export {
    useGetAllCategoriesQuery,
    useGetDetailedCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    boardsApi,
} from './api/boards.api'
