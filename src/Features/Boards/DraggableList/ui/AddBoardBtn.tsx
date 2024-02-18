import btnStyle from '@/Shared/UI/inputs/button.module.scss'
import AddIcon from '@/Shared/UI/assets/icons/add.svg?react'
import { useAddBoard } from '@/Entities/Boards/'

export const AddBoardBtn = () => {
    const handelAddBoard = useAddBoard()

    return (
        <button className={[btnStyle.btn, btnStyle.add].join(' ')} onClick={handelAddBoard}>
            <AddIcon fill="#0a68f5" />
            <span>Add board</span>
        </button>
    )
}
