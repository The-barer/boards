import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '@/Widgets/Sidebar'

import { useEffect } from 'react'

import { useSession } from '@/Entities/Session'

export const Layout = () => {
    const navigate = useNavigate()
    const session = useSession()

    useEffect(() => {
        if (!session.loading && !session.isAuthorized) {
            navigate('/auth')
        }
    }, [navigate, session])

    if (session.loading) {
        return <div>No auth, loading...</div>
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'white',
            }}
        >
            <Sidebar />
            <Outlet />
        </div>
    )
}
