import editIcon from '@/Shared/UI/assets/icons/edit-edit-pencil-line-02.svg'
import delIcon from '@/Shared/UI/assets/icons/icons-delete-24-px.svg'
import style from './category.module.scss'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { boardsApi } from '../api/boards.api'

type CategoryActions = {
    onHide: () => void
    onRename: () => void
    delete?: () => void
    id: string
}

export const CategoryActions = ({ onHide, onRename, id }: CategoryActions) => {
    const dispatch = useAppDispatch()

    const handelRename = () => {
        onHide()
        onRename()
    }

    const handelDelete = async () => {
        onHide()
        await dispatch(boardsApi.endpoints.deleteCategory.initiate(id))
            .unwrap()
            .then(() => {
                console.log('Deleted')
            })
            .catch((err) => {
                console.log(err.data.message)
            })
    }

    return (
        <>
            <div className={style.closeActions} onClick={onHide} />

            <div className={style.categoryActions}>
                <button className={style.actionItem} onClick={handelRename}>
                    <img src={editIcon} alt="Rename" />
                    <div>Rename</div>
                </button>
                <button className={style.actionItem} onClick={handelDelete}>
                    <img src={delIcon} alt="Delete" />
                    <div>Delete</div>
                </button>
            </div>
        </>
    )
}
