import { useAppDispatch } from '@/Shared/Lib/Hooks'
import style from './category.module.scss'
import { boardsApi } from '../api/boards.api'

type CategoryRename = {
    hide: () => void
    editable: boolean
    title: string
    id: string
}

export const CategoryTitle = ({ hide, editable, title, id }: CategoryRename) => {
    const dispatch = useAppDispatch()

    const handelSubmit = async (
        e: React.FormEvent<HTMLFormElement & { newTitle: HTMLInputElement }>,
    ) => {
        e.preventDefault()
        e.stopPropagation()
        hide()

        const newTitle = e.currentTarget.newTitle.value

        if (title !== newTitle) {
            console.log(id, newTitle)
            await dispatch(
                boardsApi.endpoints.updateCategory.initiate({ id, body: { title: newTitle } }),
            )
                .unwrap()
                .then(() => {
                    console.log('Category updated')
                })
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
            <input autoFocus type="text" defaultValue={title} onBlur={hide} name="newTitle" />
            <button type="submit" />
        </form>
    )
}
