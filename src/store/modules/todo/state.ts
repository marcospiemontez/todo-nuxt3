import { defineStore } from 'pinia';
import { TodoState } from '@/store/modules/types/index';

export const useState = defineStore({
  id: 'useState',

  state: (): TodoState => {
    return {
      items: [],
    }
  }
});