function encode(data) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

export const useNetlifySubmit = (
    event: SubmitEvent,
    navigateToPage?: string
) => {
    event.preventDefault()
    console.debug(event.target)
    const form = event.target as HTMLFormElement
    console.debug(new FormData(form))
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
            ...event,
        }),
    }).then(async () => await navigateTo(navigateToPage))
}
