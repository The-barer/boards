import { boardsNotEmpty, useAddBoard } from '@/Entities/Boards'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import logo from '@/Shared/UI/assets/images/stars.png'
import btnStyle from '@/Shared/UI/inputs/button.module.scss'
export default function HomePage() {
    const addNewBoard = useAddBoard()
    const isAnyBoard = useAppSelector(boardsNotEmpty)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5rem auto',
            }}
        >
            <img src={logo} alt="Start planning now!" />
            <h1>Start planning now!</h1>
            {isAnyBoard ? (
                <div>Choose any board in menu</div>
            ) : (
                <button className={btnStyle.addBlue} onClick={addNewBoard}>
                    Add board
                </button>
            )}
        </div>
    )
}
