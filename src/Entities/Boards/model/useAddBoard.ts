import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { boardsApi, useGetAllCategoriesQuery } from '../api/boards.api'

export const useAddBoard = () => {
    const dispatch = useAppDispatch()
    const { data } = useGetAllCategoriesQuery()

    const qyt = data?.length ? data.length : 0

    const newCategory = {
        title: `New Board ${qyt}`,
        priorityOrder: qyt + 1,
    }

    const handelAddBoard = () => {
        dispatch(boardsApi.endpoints.createCategory.initiate(newCategory))
        console.log(qyt)
    }
    return handelAddBoard
}
