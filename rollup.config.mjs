import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                exports: 'named'
            },
            {
                file: 'dist/index.esm.js',
                format: 'es',
                exports: 'named'
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                exclude: ["**/__tests__", "**/*.test.ts"]
            })
        ],
        external: ['react', 'react-dom', 'prop-types']
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts({ respectExternal: true })],
        external: ['react', 'react-dom', 'prop-types']
    }
]