import { useEffect } from 'react'

export const Callback = () => {
    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        const search = location.search
        const service = new URLSearchParams(search).get('state')
        if (isMobile && service) {
            location.href = `${service}${search}`
        } else {
            window.close()
        }
    }, [])

    return <div>Ожидайте...</div>
}
