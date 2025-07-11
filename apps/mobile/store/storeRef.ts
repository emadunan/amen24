import type { AppStore } from ".";

let _store: AppStore;

export const setStore = (store: AppStore) => {
  _store = store;
};

export const getStore = (): AppStore => {
  if (!_store) throw new Error("Store has not been initialized");
  return _store;
};
