export const openPopup = (url: string) => {
    const popupWidth = 500
    const popupHeight = 400
    const left = window.screenX + (window.outerWidth - popupWidth) / 2
    const top = window.screenY + (window.outerHeight - popupHeight) / 2
    const target = 'popup'

    const popup = window.open(
        url,
        target,
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`,
    )

    return popup
}
