import editIcon from '@/Shared/UI/assets/icons/edit-edit-pencil-line-02.svg'
import delIcon from '@/Shared/UI/assets/icons/icons-delete-24-px.svg'
import style from './category.module.scss'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { categoriesApi } from '../api/categories.api'

type CategoryActions = {
    hide: () => void
    rename: () => void
    delete?: () => void
    id: string
}

export const CategoryActions = ({ hide, rename, id }: CategoryActions) => {
    const dispatch = useAppDispatch()

    const handelRename = () => {
        hide()
        rename()
    }

    const handelDelete = async () => {
        hide()
        await dispatch(categoriesApi.endpoints.deleteCategory.initiate(id))
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
            <div className={style.closeActions} onClick={hide} />

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
