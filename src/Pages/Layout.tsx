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
                minWidth: '100vw',
                width: 'fit-content',
                height: '100vh',
                gap: '1rem',
                backgroundColor: 'white',
            }}
        >
            <Sidebar />
            <Outlet />
        </div>
    )
}
