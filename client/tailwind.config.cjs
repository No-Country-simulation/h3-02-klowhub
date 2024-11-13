import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  prefix: '',
  separator: ':',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    {
      raw: String.raw`(?<=\\btw\`(.*?)\`|cva\(\`(.*?)\`|clsx\((.*?)\))`,
    },
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#1F2937",
          200: "#8D8D8D",
          300: "#6b7280",
          400: "#C7C7C7"
        },
        light: {
          100: "#1F2937"
        },
        success: {
          DEFAULT: "#4DE853",
          100: "#dcfce7",
          200: "#4de853",
          300: "#07c30d",
          400: "#017605"
        },
        warning: {
          DEFAULT: "#fef9c3",
          100: "#fef9c3",
          200: "#c1d931",
          300: "#c0d931",
          400: "#854d0e"
        },
        primary: {
          A: {
            DEFAULT: "#DFD1F3",
            100: "#DFD1F3",
            200: "#BFA3E7",
            300: "#9F74DC",
            400: "#9F74DC",
            500: "#492181",
            600: "#532692",
            700: "#421E75",
            800: "#321758",
            900: "#210F3A",
          },
          B: {
            DEFAULT: "#E8C9F1",
            50: "#f7e5ff",
            100: "#E8C9F1",
            200: "#D194E2",
            300: "#B95ED4",
            400: "#9D32BC",
            450: "#812aac",
            500: "#702486",
            600: "#5A1D6B",
            700: "#431650",
            800: "#2D0E36",
            900: "#16071B",
          },
        },
        secondary: {
          A: {
            DEFAULT: "#C0D6FB",
            100: "#C0D6FB",
            200: "#A1C2FA",
            300: "#81AEF8",
            400: "#6299F6",
            500: "#4285F4",
            600: "#0E61EA",
            700: "#0A49B0",
            800: "#073075",
            850: "#1b1c44",
            900: "#03183B",
          },
        }
      },
      fontFamily: {
        openSans: 'var(--font-open-sans)',
      },
      backgroundImage: {
        'gradient-bg-1': 'var(--gradient-bg-1)',
        'gradient-bg-2': 'var(--gradient-bg-2)',
      },
      boxShadow: {
        "shadow-app": {
          1: "var(--shadow-app-1)"
        }
      }
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
};
