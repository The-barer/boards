import { AddBoardBtn } from './AddBoardBtn'

import style from './boardsMenu.module.scss'
import { DraggableList } from '@/Shared/UI/DraggableList'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { useGetAllCategoriesQuery, boardsApi, BoardItem, IBoard } from '@/Entities/Boards'

import { useState } from 'react'

export const BoardsMenu = () => {
    const dispatch = useAppDispatch()
    const { data = [], isError } = useGetAllCategoriesQuery()
    const list = !isError ? data : []
    const sortedArr = Array.from(list).sort((a, b) => a.priorityOrder - b.priorityOrder)

    const [dragElement, setDragElement] = useState<number | null>(null)

    const dragHandlers = {
        onDragStart: (e: React.DragEvent<HTMLDivElement>, item: IBoard, i: number) => {
            e.stopPropagation()
            setDragElement(i)
            console.log('start', item)
        },
        onDrop: (e: React.DragEvent<HTMLDivElement>, item: IBoard, i: number) => {
            e.preventDefault()
            console.log('drop', item)
            if (dragElement !== null && dragElement !== i) {
                const temp = sortedArr.splice(dragElement, 1)[0]
                sortedArr.splice(i, 0, temp)

                setDragElement(null)
            }
            sortedArr.forEach((element, i) => {
                if (element.priorityOrder !== i) {
                    dispatch(
                        boardsApi.endpoints.updateCategory.initiate({
                            id: element.id,
                            body: { priorityOrder: i },
                        }),
                    )
                }
            })
        },
        onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
        },
    }

    return (
        <div className={style.categoryListContainer}>
            <div className={style.title}>Boards</div>
            <div className={style.entities}>
                <DraggableList
                    arr={sortedArr}
                    renderElement={(props: IBoard) => <BoardItem {...props} key={props.id} />}
                    dragHandlers={dragHandlers}
                />
                <AddBoardBtn />
            </div>
        </div>
    )
}
