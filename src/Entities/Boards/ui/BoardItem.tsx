import { useState } from 'react'
import { IBoard } from '../model/boardsTypes'
import style from './board.module.scss'
import actionIcon from '@/Shared/UI/assets/icons/menu-more-vertical.svg'
import { BoardActions } from './BoardActions'

import { BoardTitle } from './BoardTitle'
import { useNavigate, useParams } from 'react-router-dom'

export const BoardItem = (props: IBoard) => {
    const navigate = useNavigate()

    const { boardId } = useParams()

    const [showActions, setShowActions] = useState(false)
    const [editTitle, setEditTitle] = useState(false)

    return (
        <div
            className={[style.categoryItem, boardId === props.id && style.active].join(' ')}
            onClick={() => {
                navigate(`/board/${props.id}`)
            }}
        >
            <BoardTitle onHide={() => setEditTitle(false)} {...props} editable={editTitle} />

            <button className={style.openActions} onClick={() => setShowActions(!showActions)}>
                <img src={actionIcon} alt="Category actions" />
            </button>
            {showActions && (
                <BoardActions
                    onHide={() => setShowActions(false)}
                    onRename={() => setEditTitle(!editTitle)}
                    {...props}
                />
            )}
        </div>
    )
}
