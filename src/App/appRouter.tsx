import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/Pages/Layout'
import { HomePage } from '@/Pages/Home'
import { Auth } from '@/Pages/Auth'
import { ErrorPage } from '@/Pages/ErrorPage'
import { Secret } from '@/Pages/Secret'
import { ProtectedRoute } from '@/Features/Authentication/ProtectedRoute'
import { Callback } from '@/Pages/Callback'
import { PersonalInfo } from '@/Pages/PersonalInfo'
import { BoardPage } from '@/Pages/BoardPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'main',
                element: (
                    <ProtectedRoute>
                        <Secret />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'lk',
                element: (
                    <ProtectedRoute role="cat">
                        <PersonalInfo />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/board/:boardId',
                element: (
                    <ProtectedRoute>
                        <BoardPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/auth/:type?',
        element: <Auth />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/auth/callback',
        element: <Callback />,
    },
])
