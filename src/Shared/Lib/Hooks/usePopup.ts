import { useEffect, useRef } from 'react'
import { openPopup } from '../Helpers'

export const usePopupClose = (url: string, onClose: (params: URLSearchParams) => void) => {
    const timer = useRef<NodeJS.Timeout>()

    const open = () => {
        const popup = openPopup(url)
        timer.current = setInterval(() => {
            if (popup?.closed) {
                clearInterval(timer.current)
                const search = new URLSearchParams(popup.location.search)
                onClose(search)
            }
        }, 1000)
    }
    useEffect(() => {
        return () => clearInterval(timer.current)
    }, [])

    return { open }
}
