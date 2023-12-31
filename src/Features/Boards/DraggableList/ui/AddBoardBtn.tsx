import btnStyle from '@/Shared/UI/inputs/button.module.scss'
import addIcon from '@/Shared/UI/assets/icons/add.svg'
import { useAddBoard } from '@/Entities/Boards/'

export const AddBoardBtn = () => {
    const handelAddBoard = useAddBoard()

    return (
        <button className={[btnStyle.btn, btnStyle.add].join(' ')} onClick={handelAddBoard}>
            <img src={addIcon} alt="add board" />
            <span>Add board</span>
        </button>
    )
}
