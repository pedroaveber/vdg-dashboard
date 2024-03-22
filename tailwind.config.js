const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        auth: 'linear-gradient(rgba(0,0,0,.25) 0%, rgba(0,0,0,.25) 100%), url(/img/beira-rio.jpg)',
        'dark-logo': 'url(/img/VozesDoGiganteLogoBranco.png)',
        'light-logo': 'url(/img/VozesDoGiganteLogo.png)',
      },
      gridTemplateColumns: {
        sidebar: '250px 1fr',
      },
      colors: {
        red: {
          50: '#FEEBEB',
          100: '#FED7D7',
          200: '#FDB0B0',
          300: '#FB8888',
          400: '#FA6161',
          500: '#F93939',
          600: '#F30707',
          700: '#BC0606',
          800: '#860404',
          900: '#4F0202',
          950: '#340202',
        },
      },
      aspectRatio: {
        banner: '6/1',
        news: '30/23',
        logo: '243/416',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideDownAndFade: {
          from: { opacity: '0%', transform: 'translateY(-2px)' },
          to: { opacity: '100%', transform: 'translateY(0)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
export default config
