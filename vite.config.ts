import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  optimizeDeps: {
    include: [
      'src/store/modules/todo/__tests__/*.test.ts',
    ],
  },
};

export default config;