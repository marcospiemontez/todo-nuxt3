import { defineStore } from 'pinia';
import { useState } from './state';
import { Todo } from '@/store/modules/types/index';

export const useGetters = defineStore('useGetters', () => {
  const state = useState();

  const getTodoById = (id: string): Todo | undefined => {
    return state.items.find((item) => item.id === id);
  }

  const getSortedTodos = (): Todo[] => {
    return [...state.items].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return {
    getTodoById,
    getSortedTodos,
  };
});