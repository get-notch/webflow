/* eslint-disable no-console */
import esbuild from 'esbuild';
import fs from 'fs';
import http from 'http';
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
        port: 3001,
      },
      defaultSettings
    )
    // We create a server that forwards requests to esbuild's server in order to add CORS headers.
    // This allows us to serve this content using ngrok without hitting CORS errors when trying to fetch the
    // files from Webflow.
    // All of this allows us to run ngrok on a laptop and show somebody else our work in progress while developing.
    .then((result) => {
      const { host, port } = result;
      http
        .createServer((req, res) => {
          const options = {
            hostname: host,
            port: port,
            path: req.url,
            method: req.method === 'OPTIONS' ? 'GET' : req.method,
            headers: req.headers,
          };

          const proxyReq = http.request(options, (proxyRes) => {
            if (proxyRes.statusCode === 404) {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('<h1>A custom 404 page</h1>');
              return;
            }

            const additionalHeaders = {
              'Access-Control-Allow-Origin': 'https://get-notch.webflow.io',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Max-Age': '60',
            };
            const headers = {
              ...proxyRes.headers,
              ...additionalHeaders,
            };
            res.writeHead(proxyRes.statusCode, headers);
            proxyRes.pipe(res, { end: true });
          });

          req.pipe(proxyReq, { end: true });
        })
        .listen(3000, () => {
          console.log('listening on port ' + 3000);
        });
    });
}
