import { defineStore } from 'pinia';
import { extractStore } from 'src/store/modules/extractStore';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useState } from './state';

export const todoStore = defineStore('todoStore', () => {
  return {
    ...extractStore(useState()),
    ...extractStore(useGetters()),
    ...extractStore(useActions())
  }
})