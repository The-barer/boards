import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { boardsApi } from '../api/boards.api'

import style from './board.module.scss'

type CategoryRename = {
    onHide: () => void
    editable: boolean
    title: string
    id: string
}

export const BoardTitle = ({ onHide, editable, title, id }: CategoryRename) => {
    const dispatch = useAppDispatch()

    const handelSubmit = async (
        e: React.FormEvent<HTMLFormElement & { newTitle: HTMLInputElement }>,
    ) => {
        e.preventDefault()
        e.stopPropagation()
        onHide()

        const newTitle = e.currentTarget.newTitle.value

        if (title !== newTitle) {
            console.log(id, newTitle)
            await dispatch(
                boardsApi.endpoints.updateCategory.initiate({ id, body: { title: newTitle } }),
            )
                .unwrap()
                .catch((err) => {
                    console.log(err.data.message)
                })
        }
    }

    if (!editable) {
        return <div className={style.title}>{title}</div>
    }

    return (
        <form onSubmit={handelSubmit} className={style.renameForm}>
            <input autoFocus type="text" defaultValue={title} onBlur={onHide} name="newTitle" />
            <button type="submit" />
        </form>
    )
}
