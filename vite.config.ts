import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'

import tailwindcss from '@tailwindcss/vite'
import terser from '@rollup/plugin-terser'

type ViteConfigInput = {
	mode: string
	command: string
}

export default (args: ViteConfigInput) => {
	const generateScopedName =
		args.mode === 'production'
			? '[hash:base64:6]'
			: '[name]_[local]__[hash:base64:5]'

	return defineConfig({
		plugins: [
			react(),
			tailwindcss(),
			viteCompression({
				algorithm: 'brotliCompress',
			}),
		],

		resolve: {
			alias: {
				components: '/src/components',
				hooks: '/src/hooks',
				types: '/src/types',
				schemas: '/src/schemas',
				styles: '/src/styles',
				utils: '/src/utils',
				views: '/src/views',
			},
		},

		css: {
			modules: {
				localsConvention: 'camelCase',
				generateScopedName,
				hashPrefix: 'prefix',
			},
		},

		server: {
			host: true,
		},

		build: {
			minify: 'terser',
			rollupOptions: {
				plugins: [
					terser({
						compress: true,
					}),
				],
				output: {
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('@vkontakte/icons')) {
								return 'vk-icons'
							}

							if (
								id.includes('tailwindcss') ||
								id.includes('tailwind-merge') ||
								id.includes('@tailwindcss')
							) {
								return 'tailwind'
							}

							if (
								id.includes('react-router') ||
								id.includes('react-router-dom')
							) {
								return 'routing'
							}

							if (
								id.includes('postcss') ||
								id.includes('autoprefixer') ||
								id.includes('cssnano') ||
								id.includes('sass')
							) {
								return 'styles-processing'
							}

							if (
								id.includes('react-hook-form') ||
								id.includes('@hookform/resolvers') ||
								id.includes('yup')
							) {
								return 'forms'
							}

							return 'vendor'
						}
					},
				},
			},
		},

		optimizeDeps: {
			exclude: ['js-big-decimal'],
		},
	})
}
