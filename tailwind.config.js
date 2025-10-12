/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define the custom keyframes for the continuous rolling animation
      keyframes: {
        'continuous-roll': {
          '0%': { transform: 'translateY(0)' },
          // This moves the list up by the height of the original 3 items (3 * 1.2em)
          '100%': { transform: 'translateY(-3.6em)' },
        }
      },
      // Define the animation utility to use the keyframes
      animation: {
        // We'll use a longer duration (e.g., 10s) and 'linear' for constant speed
        'continuous-roll': 'continuous-roll 10s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
        require('tailwind-scrollbar-hide') // Add this line

  ],
}
