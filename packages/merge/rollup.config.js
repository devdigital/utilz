import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/merge.js',
    plugins: [terser()],
    output: {
      format: 'umd',
      file: 'umd/index.js',
      name: 'merge',
      esModule: false,
    },
  },
  {
    input: 'src/merge.js',
    output: {
      format: 'esm',
      file: 'esm/index.js',
    },
  },
]
