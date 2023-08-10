import create, { createContext, suspense } from "zustand-with-suspense";

const createFn = (initialValues) => (set, get) => ({
  a: 1,
  b: 2,
  count: 0,
  setA: (a) => {
    set(a);
  },
  addCount: () => {
    set(({ count }) => ({ count: count + 1 }));
  },
  suspenseData: suspense(
    async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 3000);
      })
  ),
  suspenseDataB: suspense(
    async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, 1000);
      })
  ),
  ...initialValues,
});

const { Provider, useStore, getStore } = createContext(createFn);

const createStore = (initialValues) => create(createFn(initialValues));

export { Provider, useStore, createStore, getStore };
