/**
 * Handles the submission of a form to Netlify Forms.
 * For this to work, it is essential that the form in your template has a dummy counterpart in an html file inside your public directory.
 *
 * @param {Event} event - The event submitted by the form
 * @param {string} pathToDummyForm - Path to the dummy form in your public directory, which is needed for netlify to recognize that there is a form.
 * @param {string} pathToNextPage - Path to the next page you want to redirect to after the form is submitted. This will be used by the nuxt 3 navigateTo() utility function.
 */
export default async function useNetlifyFormSubmit(
    /**
     * The event submitted by the form
     * @type {Event}
     */
    event: Event,
    /**
     * Path to the dummy form in your public directory, which is needed for netlify to recognize that there is a form.
     * @type {string}
     */
    pathToDummyForm: string,
    /**
     * Path to the next page you want to redirect to after the form is submitted. This will be used by the nuxt 3 navigateTo() utility function.
     * @type {string}
     */
    pathToNextPage: string
) {
    // console.debug(event.target)
    const formData = new FormData(event.target as HTMLFormElement)
    // console.debug(formData)
    const convertedFormEntries = Array.from(formData, ([key, value]) => [
        key,
        typeof value === 'string' ? value : value.name,
    ])
    // console.debug(convertedFormEntries)
    const body = new URLSearchParams(convertedFormEntries).toString()
    // console.debug(body)
    await fetch(pathToDummyForm, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // "Accept": "application/json",
        },
        body: body,
    })
        // .then((response) => console.debug(response))
        .then(async () => await navigateTo(pathToNextPage))
        .catch((error) => console.error(error))
}
