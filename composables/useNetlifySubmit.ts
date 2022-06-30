function encode(data) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export const useNetlifySubmit = (event, navigateToPage?: string) => {
    event.preventDefault()
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
            'form-name': event.currentTarget.getAttribute('name'),
        }),
    }).then(async () => await navigateTo(navigateToPage))
}
