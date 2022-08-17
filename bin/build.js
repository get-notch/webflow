/* eslint-disable no-console */
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

function getAllFilesInDirectory(directory) {
  const array = [];
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.resolve(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      array.push(...getAllFilesInDirectory(fullPath));
    } else {
      array.push(fullPath);
    }
  }
  return array;
}

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const allFiles = getAllFilesInDirectory('src/pages');
const entryPoints = allFiles.filter((f) => ['.js', '.ts', '.css'].includes(path.extname(f)));

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
};

// Files building
if (production) {
  esbuild.build(defaultSettings);
}

// Files serving
else {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3000,
      },
      defaultSettings
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
