/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        // './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            cursor: {
                sun: 'url(/assets/cursor/sun.svg) 4 4, auto',
                moon: 'url(/assets/cursor/moon.svg) 4 4, auto',
                paperplane:
                    'url(/assets/cursor/PhPaperPlaneTiltFill.svg) 4 4, auto',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            animation: {
                marquee: 'marquee 30s linear infinite',
                marquee2: 'marquee2 30s linear infinite',
                blink: 'blink 1s step-start infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
