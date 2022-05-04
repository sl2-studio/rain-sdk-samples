import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import scss from "rollup-plugin-scss";


const production = !process.env.ROLLUP_WATCH;
const site = process.env.SITE || 'defaults';
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || '';
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || '';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.SITE': JSON.stringify(site),
			'process.env.NFT_STORAGE_KEY': JSON.stringify(NFT_STORAGE_KEY),
			'process.env.POLYGON_API_KEY': JSON.stringify(POLYGON_API_KEY),
		}),
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				// defaults: {
				// 	style: 'scss'
				//   },
				postcss: {
					plugins: [
					//  require("tailwindcss"),
					 require("autoprefixer"),
					],
				  },
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			emitCss: true,
		}),
		scss({watch: 'src', output: 'public/build/bootstrap.css'}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css'}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		json(),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
