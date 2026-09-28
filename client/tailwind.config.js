/** Tokens taken from the Stitch "Alpine Mist & Cedar" design system. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0d1511',
        'surface-low': '#151d19',
        'surface-mid': '#19211d',
        'surface-high': '#242c27',
        'surface-highest': '#2e3732',
        ink: '#dce5de',
        'ink-dim': '#c2c8bf',
        outline: '#8c928a',
        pine: '#1f3a24',
        mint: '#afcfb0',
        'mint-deep': '#49654c',
        amber: { DEFAULT: '#faba75', deep: '#6a3f01', ochre: '#bc6c25' },
        linen: '#f9f8f3'
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,.35)' }
    }
  },
  plugins: []
};
