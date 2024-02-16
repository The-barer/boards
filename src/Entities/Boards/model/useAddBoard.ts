import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { boardsApi, useGetAllCategoriesQuery } from '../api/boards.api'

export const useAddBoard = () => {
    const dispatch = useAppDispatch()
    const { data } = useGetAllCategoriesQuery()

    const currentCount = data?.length ? data.length : 0

    const newCategory = {
        title: `New Board ${currentCount}`,
        priorityOrder: currentCount + 1,
    }

    const handelAddBoard = () => {
        dispatch(boardsApi.endpoints.createCategory.initiate(newCategory))
    }
    return handelAddBoard
}
