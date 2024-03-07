import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const reactPlugin = react();

export default () => {
    return defineConfig({
      plugins: [reactPlugin],
    });
}
