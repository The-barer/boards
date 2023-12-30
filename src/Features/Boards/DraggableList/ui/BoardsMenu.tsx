import { AddBoardBtn } from './AddBoardBtn'

import style from './boardsMenu.module.scss'
import { DraggableList } from './draggableList'
import { useGetAllCategoriesQuery } from '@/Entities/Boards/api/boards.api'

export const BoardsMenu = () => {
    const { data = [], isError } = useGetAllCategoriesQuery()
    const list = !isError ? data : []

    return (
        <div className={style.categoryListContainer}>
            <div className={style.title}>Boards</div>
            <div className={style.entities}>
                <DraggableList arr={list} />
                <AddBoardBtn />
            </div>
        </div>
    )
}
