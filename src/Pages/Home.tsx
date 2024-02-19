import { boardsIsEmpty, useAddBoard } from '@/Entities/Boards'

import { useAppSelector } from '@/Shared/Lib/Hooks'

import logo from '@/Shared/UI/assets/images/stars.png'
import btnStyle from '@/Shared/UI/inputs/button.module.scss'

export function HomePage() {
    const addNewBoard = useAddBoard()
    const isBoardExists = useAppSelector(boardsIsEmpty)

    function renderMenu() {
        if (!isBoardExists) {
            return <div>Choose any board in menu</div>
        }

        // TODO ощущение что это большой компонент который можно вынести в и там добавить файл стиля
        // TODO если идея была в том чтобы иметь одинаковые стиль кнопок, то стоит написать свой компонент для кнопки который будет принимать в параметры вариант кнопки
        // TODO сейчас выглядит как избыточный стиль который будет использовать по всему проекту
        return (
            <button className={btnStyle.addBlue} onClick={addNewBoard}>
                Add board
            </button>
        )
    }

    return (
        <div
            // TODO никогда не используй инлайн стили если все значения статичные
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5rem auto',
            }}
        >
            <img src={logo} alt="Start planning now!" />
            <h1>Start planning now!</h1>
            {renderMenu()}
        </div>
    )
}
