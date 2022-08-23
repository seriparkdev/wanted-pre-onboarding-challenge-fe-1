const storage = localStorage;

const Storage = {
  set(key: string, value: string) {
    return storage.setItem(key, value);
  },
  get(key: string) {
    return storage.getItem(key);
  },
  remove(key: string) {
    return storage.removeItem(key);
  },
};

export default Storage;
