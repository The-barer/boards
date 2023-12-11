import { useNavigate } from 'react-router-dom'

import { useChekAuth } from '@/Entities/Session'
import { useEffect } from 'react'

export default function HomePage() {
    const navigate = useNavigate()
    const isAuthorized = useChekAuth()

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/auth')
        }
    }, [isAuthorized, navigate])
    return (
        <div style={{ backgroundColor: 'white' }}>
            <p>Добро пожаловать в TheBoards - todoApp by Dmitry Barer</p>
            <br />
        </div>
    )
}
