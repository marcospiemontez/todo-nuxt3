import { UserConfig } from 'vite';

const config: UserConfig = {
  optimizeDeps: {
    include: [
      'src/store/modules/todo/__tests__/*.test.ts',
    ],
  },
};

export default config;