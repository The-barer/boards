import { IBoard, BoardItem } from '@/Entities/Boards'
import { useState } from 'react'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { boardsApi } from '@/Entities/Boards/api/boards.api'

type DraggableList = {
    arr: IBoard[]
}

export const DraggableList = ({ arr = [] }: DraggableList) => {
    const [dragged, setDragged] = useState<number | null>(null)
    const dispatch = useAppDispatch()

    const sortedArr = Array.from(arr).sort((a, b) => a.priorityOrder - b.priorityOrder)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, i: number) => {
        e.stopPropagation()
        setDragged(i)
    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, current: number) => {
        e.preventDefault()
        if (dragged !== null && dragged !== current) {
            const temp = sortedArr.splice(dragged, 1)[0]
            sortedArr.splice(current, 0, temp)

            setDragged(null)
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
    }

    return (
        <>
            {sortedArr.map((item, i) => {
                return (
                    <div
                        onDragStart={(e) => {
                            dragStartHandler(e, i)
                        }}
                        onDragLeave={(e) => {
                            dragLeaveHandler(e)
                        }}
                        onDragOver={(e) => {
                            dragOverHandler(e)
                        }}
                        onDragEnter={(e) => {
                            dragEnterHandler(e)
                        }}
                        onDragEnd={(e) => {
                            dragEndHandler(e)
                        }}
                        onDrop={(e) => {
                            dragDropHandler(e, i)
                        }}
                        draggable
                        key={i}
                    >
                        <BoardItem {...item} />
                    </div>
                )
            })}
        </>
    )
}
