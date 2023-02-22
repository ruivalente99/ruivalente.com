
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig( {
	test: {
		environment: 'jsdom',
		globals: true,
		coverage: {
			include: ['src/**/*.{js,jsx,ts,tsx}'],
			exclude: ['**/*.test.{js,jsx,ts,tsx}', 'src/tests/**/*.{js,jsx,ts,tsx}'],
			reporter: ['text', 'lcov']
		}
	},
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
} );
