import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx', // Garde jsx pour React
            // Si tu as renommé app.css en app.scss et que tu l'importes dans app.jsx
            // tu n'as peut-être pas besoin de le lister ici explicitement si Vite le trouve via l'import JS.
            // Mais si tu veux être explicite ou si tu as des CSS séparés :
            // input: ['resources/js/app.jsx', 'resources/css/app.scss'],
            refresh: true,
        }),
        react(),
    ],
});
