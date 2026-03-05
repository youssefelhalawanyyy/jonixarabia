import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jonix: {
          // Premium blue from logo
          blue: '#1e5a96',
          'blue-light': '#2d7bb8',
          'blue-dark': '#0d3d5c',
          'blue-lighter': '#4a9fd8',
          // Accent colors
          accent: '#00d4ff',
          'accent-light': '#66e6ff',
          'accent-dark': '#00a8cc',
          // Neutrals
          gray: '#f8f9fa',
          'gray-light': '#ffffff',
          'gray-dark': '#1a1a1a',
          'gray-medium': '#333333',
          'gray-light-medium': '#666666',
          // Brand
          cyan: '#00d4ff',
          teal: '#00a8cc',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arab: ['var(--font-arab)', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'zoom-in': 'zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'rotate-in': 'rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        
        // Continuous animations
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        
        // Interactive animations
        'scale-up': 'scaleUp 0.3s ease-out',
        'scale-down': 'scaleDown 0.3s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        
        // Gradient animations
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        
        // Glow effects
        'neon-glow': 'neonGlow 2s ease-in-out infinite',
        'cyber-pulse': 'cyberPulse 2s ease-in-out infinite',
      },
      keyframes: {
        // Entrance keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.95)' },
          '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        
        // Continuous animations
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.2)' },
        },
        
        // Interactive animations
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-2deg)' },
          '75%': { transform: 'rotate(2deg)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Gradient animations
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        
        // Glow effects
        neonGlow: {
          '0%, 100%': {
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(30, 90, 150, 0.3)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(0, 212, 255, 1), 0 0 40px rgba(30, 90, 150, 0.6)',
          },
        },
        cyberPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.7)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 0 20px rgba(0, 212, 255, 0)',
            transform: 'scale(1.05)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient':
          'linear-gradient(135deg, #1e5a96 0%, #00d4ff 25%, #2d7bb8 50%, #00a8cc 75%, #1e5a96 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 30px rgba(0, 212, 255, 0.5)',
        'glow-lg': '0 0 50px rgba(0, 212, 255, 0.7)',
        'glow-xl': '0 0 80px rgba(0, 212, 255, 0.9)',
        'inset-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.2)',
        'premium': '0 20px 40px rgba(30, 90, 150, 0.15)',
        'premium-lg': '0 30px 60px rgba(30, 90, 150, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
