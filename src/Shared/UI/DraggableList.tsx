import { ReactNode, useState } from 'react'

type DraggList<T> = {
    arr: T[]
    renderElement: (props: T) => ReactNode
    updateFn: (item: T, newOrder: number) => void
}

export const DraggableList = <P,>({ arr = [], updateFn, renderElement }: DraggList<P>) => {
    const [dragged, setDragged] = useState<number | null>(null)

    const sortedArr = Array.from(arr)
    console.log(arr)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, i: number) => {
        e.stopPropagation()

        setDragged(i)
    }

    const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, current: number) => {
        e.preventDefault()
        if (dragged !== null && dragged !== current) {
            const temp = sortedArr.splice(dragged, 1)[0]

            sortedArr.splice(current, 0, temp)

            sortedArr.forEach((item, index) => updateFn(item, index))
        }

        setDragged(null)
    }

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <>
            {sortedArr.map((item, i) => {
                return (
                    <div
                        onDragStart={(e) => {
                            dragStartHandler(e, i)
                        }}
                        onDragEnd={(e) => {
                            dragEndHandler(e)
                        }}
                        onDragOver={(e) => {
                            dragOverHandler(e)
                        }}
                        onDrop={(e) => {
                            dragDropHandler(e, i)
                        }}
                        draggable
                        key={i}
                    >
                        {renderElement(item)}
                    </div>
                )
            })}
        </>
    )
}
