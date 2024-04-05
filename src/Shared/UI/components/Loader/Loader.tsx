import style from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.animation}></div>
        </div>
    )
}
