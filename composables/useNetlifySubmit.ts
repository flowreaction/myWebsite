/**
 * Handles the submission of a form to Netlify Forms.
 * For this to work, it is essential that the form in your template has a dummy counterpart in an html file inside your public directory.
 *
 * @param {Event} event - The event submitted by the form
 * @param {string} pathToDummyForm - Path to the dummy form in your public directory, which is needed for netlify to recognize that there is a form.
 * @param {string} pathToNextPage - Path to the next page you want to redirect to after the form is submitted. This will be used by the nuxt 3 navigateTo() utility function.
 */
export default async function useNetlifySubmit(
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
    const formData = new FormData(event.target as HTMLFormElement)
    const bodyObject = Object.fromEntries(formData)
    const convertedFormEntries = Array.from(formData, ([key, value]) => [
        key,
        typeof value === 'string' ? value : value.name,
    ])

    const body = new URLSearchParams(convertedFormEntries).toString()
    const { data, error, status } = await $fetch('/api/contact/contact', {
        method: 'POST',
        body: bodyObject,
    })
    await fetch(pathToDummyForm, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // "Accept": "application/json",
        },
        body: body,
    })
    // .then(async () => await navigateTo(pathToNextPage))
    // .catch((error) => console.error(error))
    await navigateTo(pathToNextPage)
}
