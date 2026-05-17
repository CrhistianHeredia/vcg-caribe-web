/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // VCG Caribe Design System
        deep: {
          DEFAULT: '#0B1F3A',
          50: '#1a3a5c',
          100: '#152d4a',
          200: '#0B1F3A',
          300: '#081829',
          400: '#051018',
        },
        navy: {
          DEFAULT: '#1E3A5F',
          light: '#2a4d7a',
          dark: '#152d4a',
        },
        accent: {
          DEFAULT: '#38bdf8',
          light: '#7dd3fc',
          dark: '#0ea5e9',
        },
        light: '#F8FAFC',
        text: '#0F172A',
        muted: '#475569',
      },
      backgroundImage: {
        // Gradient backgrounds
        'gradient-deep': 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 50%, #0B1F3A 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1E3A5F 0%, #2a4d7a 50%, #1E3A5F 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, #1E3A5F 0%, #0B1F3A 70%)',
        'gradient-diagonal': 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 25%, #2a4d7a 50%, #1E3A5F 75%, #0B1F3A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #1E3A5F 0px, transparent 50%), radial-gradient(at 80% 0%, #38bdf8 0px, transparent 50%), radial-gradient(at 0% 50%, #2a4d7a 0px, transparent 50%), radial-gradient(at 80% 50%, #0B1F3A 0px, transparent 50%), radial-gradient(at 0% 100%, #1E3A5F 0px, transparent 50%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
