import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/Widgets/Sidebar'

export const Layout = () => {
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
