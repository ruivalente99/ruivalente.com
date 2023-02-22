import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve( __dirname, 'src' ),
      'assets': path.resolve( __dirname, 'src/assets' ),
      'components': path.resolve( __dirname, 'src/components' ),
      'hooks': path.resolve( __dirname, 'src/hooks' ),
      'i18n': path.resolve( __dirname, 'src/i18n' ),
      'router': path.resolve( __dirname, 'src/router' ),
      'screens': path.resolve( __dirname, 'src/screens' ),
      'services': path.resolve( __dirname, 'src/services' ),
      'store': path.resolve( __dirname, 'src/store' ),
      'tests': path.resolve( __dirname, 'src/tests' ),
      'types': path.resolve( __dirname, 'src/types' ),
      'utils': path.resolve( __dirname, 'src/utils' ),
      'views': path.resolve( __dirname, 'src/views' ),
      'App': path.resolve( __dirname, 'src/App.tsx' ),
    },
  },
} )
