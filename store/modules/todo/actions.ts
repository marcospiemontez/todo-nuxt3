import { defineStore } from 'pinia';
import { useState } from './state';
import { Todo, TodoAdd, TodoUpdate } from '@/store/modules/types/index';
import { v4 as uuid } from 'uuid';

export const useActions = defineStore('useActions', () => {
  const state = useState();

  const add = (todo: TodoAdd): void => {
    const id = uuid();
    const itemToAdd: Todo = {
      id,
      ...todo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    state.items.push(itemToAdd);
  }

  const remove = (id: string): void => {
    state.items = state.items.filter((todo) => todo.id !== id);
  }

  const update = (id: string, update: TodoUpdate): void => {
    const index = state.items.findIndex((item: Todo) => item.id === id);
    if (index !== -1) {
      state.items[index] = {
        ...state.items[index],
        ...update,
        updatedAt: new Date()
      };
    }
  }

  return {
    add,
    remove,
    update,
  };
});