const esbuild = require('esbuild');

const generalConfig = { minify: true, bundle: true, write: true, format: 'cjs' };
esbuild.build(
  Object.assign({}, generalConfig, {
    entryPoints: [
      { out: 'index', in: 'src/index.tsx'},
      { out: 'index', in: 'src/index.html'}
    ],
    outdir: 'dist',
    platform: 'browser',
    loader: {
      '.ts': 'tsx',
      '.js': 'jsx',
      '.html': 'copy',
      '.css': 'css'
    }
  })
);
