import { useState } from 'react'
import { ICategory } from '../model/categoriesTypes'
import style from './category.module.scss'
import actionIcon from '@/Shared/UI/assets/icons/menu-more-vertical.svg'
import { CategoryActions } from './categoryActions'

import { CategoryTitle } from './categoryTitle'

export const CategoryItem = (props: ICategory) => {
    const [showActions, setShowActions] = useState(false)
    const [editTitle, setEditTitle] = useState(false)

    return (
        <div className={style.categoryItem}>
            <CategoryTitle hide={() => setEditTitle(false)} {...props} editable={editTitle} />

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
                    hide={() => setShowActions(false)}
                    rename={() => setEditTitle(!editTitle)}
                    {...props}
                />
            )}
        </div>
    )
}
