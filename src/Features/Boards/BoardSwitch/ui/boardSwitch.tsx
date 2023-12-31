/// <reference types="vite-plugin-svgr/client" />

import IconLeft from '@assets/icons/arrow-chevron-left.svg?react'
import IconRight from '@assets/icons/arrow-chevron-right.svg?react'
import style from './boardSwitch.module.scss'
import btn from '@/Shared/UI/inputs/button.module.scss'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import { boardsList } from '@/Entities/Boards'

export const BoardSwitch = ({ boardID }: { boardID: string }) => {
    const boards = useAppSelector(boardsList)
    const navigate = useNavigate()
    const currentBoardIndex = boards.findIndex((board) => board.id === boardID)
    const boardName = currentBoardIndex !== -1 ? boards[currentBoardIndex].title : 'not found'

    const prev = currentBoardIndex > 0
    const next = currentBoardIndex < boards.length - 1

    const handelNavigatePrev = () => {
        if (prev) {
            const prevBoard = boards[currentBoardIndex - 1].id
            navigate(`/board/${prevBoard}`)
        }
    }

    const handelNavigateNext = () => {
        if (next) {
            const nextBoard = boards[currentBoardIndex + 1].id
            navigate(`/board/${nextBoard}`)
        }
    }

    return (
        <div className={style.boardSwitch}>
            <button className={btn.iconBtn} onClick={handelNavigatePrev} disabled={!prev}>
                <IconLeft opacity={prev ? 1 : 0.5} />
            </button>
            <button className={btn.iconBtn} onClick={handelNavigateNext} disabled={!next}>
                <IconRight opacity={next ? 1 : 0.5} />
            </button>
            <span>{boardName}</span>
        </div>
    )
}
