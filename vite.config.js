import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import fs from 'fs';

const folders = fs.readdirSync('./src', { withFileTypes: true });
const fileNames = folders
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const filePaths = fileNames.reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: `/${cur === 'src' ? cur : 'src/' + cur}`,
  }),
  ''
);

console.log(`filePaths: ${JSON.stringify(filePaths, null, 2)}`);

export default defineConfig({
  plugins: [react(), svgrPlugin({ icon: true })],
  server: {
    port: 4000,
    open: true, // this will open directly to your browser
  },
  resolve: {
    alias: {
      ...filePaths,
    },
  },
});
