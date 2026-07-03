import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const commitHash = process.env.GITHUB_SHA;

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        COMMIT_HASH: JSON.stringify(commitHash)
    },
    envDir: './env',
    base: '/project-flashcards-frontend/'
});
