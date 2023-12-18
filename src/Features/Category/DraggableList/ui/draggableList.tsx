import { ICategory, CategoryItem } from '@/Entities/Category'

type DraggableList = {
    arr: ICategory[]
}

export const DraggableList = ({ arr }: DraggableList) => {
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, item: ICategory) => {
        console.log(e, item)
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
    const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, item: ICategory) => {
        e.preventDefault()
        console.log(e, item)
    }

    return (
        <div>
            {arr.map((item, i) => {
                return (
                    <div
                        onDragStart={(e) => {
                            dragStartHandler(e, item)
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
                            dragDropHandler(e, item)
                        }}
                        draggable
                        key={i}
                    >
                        <CategoryItem {...item} />
                    </div>
                )
            })}
        </div>
    )
}
