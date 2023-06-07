import { setActivePinia, createPinia } from 'pinia';
import { describe, test, expect, beforeAll, afterEach, beforeEach } from 'vitest';
import { useActions } from '../actions';
import { useState } from '../state';
import { useGetters } from '../getters';
import { TodoState } from '../../types';

const getFirstTodoId = (todoState: TodoState) => {
  return todoState.items[0].id;
};

beforeAll(() => {
  setActivePinia(createPinia());
});

describe('useActions', () => {
  let state: ReturnType<typeof useState>;
  let getters: ReturnType<typeof useGetters>;
  let actions: ReturnType<typeof useActions>;

  beforeEach(() => {
    state = useState();
    getters = useGetters();
    actions = useActions();
  });

  afterEach(() => {
    state.$reset();
  });

  test('creates a actions', () => {
    expect(actions).toBeDefined();
  });


  test("initializes with empty items", () => {
    expect(state.items).toStrictEqual([]);
  });

  test("creates a todo", () => {
    actions.add({ label: 'Clean Home' });

    expect(state.items).toStrictEqual([
      {
        id: expect.any(String),
        label: 'Clean Home',
        done: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }
    ])
  })

  test("gets by id", () => {
    actions.add({ label: 'Clean Home' });

    const id = getFirstTodoId(state);

    const item = getters.getTodoById(id);
    expect(item && item.label).toBe('Clean Home');
  });

  test("gets ordered todos without mutating state", () => {
    const items = [
      {
        createdAt: new Date(2021, 1, 22),
      },
      {
        createdAt: new Date(2021, 1, 22),
      },
      {
        createdAt: new Date(2020, 1, 22),
      },
      {
        createdAt: new Date(1994, 1, 22),
      },
    ];

    // @ts-ignore
    state.items = items;
    const sortedItems = getters.getSortedTodos();

    expect(sortedItems[0].createdAt.getFullYear()).toBe(1994);
  });

  test("removes a todo", () => {
    actions.add({ label: 'Delete Me' });
    const id = getFirstTodoId(state);
    actions.remove(id);

    expect(state.items).toStrictEqual([]);
  });

  test("update a todo label", () => {
    actions.add({ label: 'Edit Me' });
    const id = getFirstTodoId(state);
    actions.update(id, { label: 'Edited' });

    expect(getters.getTodoById(id)?.label).toBe('Edited');
  });

  test("updates a todo done", () => {
    actions.add({ label: 'Edit Me' });
    const id = getFirstTodoId(state);
    actions.update(id, { done: true });

    expect(getters.getTodoById(id)?.done).toBe(true);
  });
});
