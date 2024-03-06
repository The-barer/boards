import { boardsIsEmpty } from '@/Entities/Boards'
import { BoardAddBtn } from '@/Entities/Boards/ui/BoardAddBtn'
import { useAppSelector } from '@/Shared/Lib/Hooks'

import logo from '@/Shared/UI/assets/images/stars.png'

import style from '@UI/Styles/pagesStyle.module.scss'

export function HomePage() {
    const isBoardExists = useAppSelector(boardsIsEmpty)

    function renderMenu() {
        if (isBoardExists) {
            return <div>Choose any board in menu</div>
        }

        return <BoardAddBtn />
    }

    return (
        <div className={style.homePage}>
            <img src={logo} alt="Start planning now!" />
            <h1>Start planning now!</h1>
            {renderMenu()}
        </div>
    )
}
