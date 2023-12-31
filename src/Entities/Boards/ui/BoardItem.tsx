import { useState } from 'react'
import { IBoard } from '../model/boardsTypes'
import style from './category.module.scss'
import actionIcon from '@/Shared/UI/assets/icons/menu-more-vertical.svg'
import { CategoryActions } from './categoryActions'

import { CategoryTitle } from './categoryTitle'
import { useNavigate, useParams } from 'react-router-dom'

export const BoardItem = (props: IBoard) => {
    const [showActions, setShowActions] = useState(false)
    const [editTitle, setEditTitle] = useState(false)
    const navigate = useNavigate()
    const { boardId } = useParams()

    return (
        <div
            className={[style.categoryItem, boardId === props.id && style.active].join(' ')}
            onClick={() => {
                navigate(`/board/${props.id}`)
            }}
        >
            <CategoryTitle onHide={() => setEditTitle(false)} {...props} editable={editTitle} />

            <button
                className={style.openActions}
                onClick={() => {
                    setShowActions(!showActions)
                }}
            >
                <img src={actionIcon} alt="Category actions" />
            </button>
            {showActions && (
                <CategoryActions
                    onHide={() => setShowActions(false)}
                    onRename={() => setEditTitle(!editTitle)}
                    {...props}
                />
            )}
        </div>
    )
}
