import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '@/Widgets/Sidebar'

import { Suspense, useEffect } from 'react'

import { useCheckSession } from '@/Entities/Session'

export const Layout = () => {
    const navigate = useNavigate()
    const { pathname: requested } = useLocation()
    const isAuth = useCheckSession()

    useEffect(() => {
        if (!isAuth) {
            navigate('/auth', { state: { requested } })
        }
    }, [isAuth, navigate, requested])

    if (!isAuth) {
        return <div>No auth, logout...</div>
    }

    return (
        <div className="main-layout">
            <Suspense fallback={<div style={{ opacity: '0.7' }}>Loading...</div>}>
                <Sidebar />
                <Outlet />
            </Suspense>
        </div>
    )
}
