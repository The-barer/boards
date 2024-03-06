import { useAddBoard } from '..'

import style from './board.module.scss'

export const BoardAddBtn = () => {
    const addNewBoard = useAddBoard()

    return (
        <button className={style.btnAddBlue} onClick={addNewBoard}>
            Add board
        </button>
    )
}
