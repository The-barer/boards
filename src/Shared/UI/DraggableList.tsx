import { ReactNode } from 'react'

type DraggList<T> = {
    arr: T[]
    renderElement: (props: T) => ReactNode
    dragHandlers: {
        onDragStart: (e: React.DragEvent<HTMLDivElement>, item: T, i: number) => void
        onDrop: (e: React.DragEvent<HTMLDivElement>, item: T, i: number) => void
        onDragEnd?: (e: React.DragEvent<HTMLDivElement>, item: T, i: number) => void
    }
    // updateFn: (item: T, newOrder: number) => void
}

export const DraggableList = <P,>({ arr = [], renderElement, dragHandlers }: DraggList<P>) => {
    return (
        <>
            {arr.map((item, i) => {
                return (
                    <div
                        draggable
                        key={i}
                        onDragStart={(e) => dragHandlers.onDragStart(e, item, i)}
                        onDrop={(e) => dragHandlers.onDrop(e, item, i)}
                        onDragEnd={(e) =>
                            dragHandlers.onDragEnd && dragHandlers.onDragEnd(e, item, i)
                        }
                        onDragOver={(e) => {
                            e.preventDefault()
                        }}
                    >
                        {renderElement(item)}
                    </div>
                )
            })}
        </>
    )
}
