import { type Storage, getLocalStorage } from "@/util/storage";
import { Config } from "@/config";
import { store, useStore } from "./store";

export interface FeatureOptions<T extends object = object> {
  name: string;
  initialState?: T;
  loadState?: (storage: Storage) => Partial<T>;
  saveState?: (storage: Storage) => void;
}

export interface FeatureStore<T extends object = object>
  extends FeatureOptions<T> {
  activate: () => void;
  getState: () => T;
  setState: (state: T | Partial<T>, replace?: boolean) => void;
  persistState: () => void;
  useStore: () => T;
}

const featureStores: FeatureStore[] = [];

export function activateFeatures() {
  featureStores.forEach((s) => s.activate());
}

export function registerFeature<T extends object>(
  featureOptions: FeatureOptions<T>,
): FeatureStore<T> {
  const name = featureOptions.name;

  store.setState({
    [name]: { ...featureOptions.initialState },
  });

  const getState = () => store.getState()[name] as T;

  const setState = <T>(state: T | Partial<T>, replace?: boolean) => {
    if (replace) {
      store.setState({ [name]: state });
    } else {
      const prevState = store.getState()[name] as T;
      store.setState({ [name]: { ...prevState, ...state } });
    }
  };

  // TODO: support selectors!
  const useFeatureStore = <T>(): T => {
    return useStore((state) => state[name] as T);
  };

  const activate = () => {
    const storage = getLocalStorage(Config.instance.name);
    if (storage && featureOptions.loadState) {
      try {
        const loadedState = featureOptions.loadState(storage);
        setState(loadedState);
      } catch (e) {
        console.warn(`failed to load state for slice "${name}"`, e);
      }
    }
  };

  const persistState = () => {
    const storage = getLocalStorage(Config.instance.name);
    if (storage && featureOptions.saveState) {
      featureOptions.saveState(storage);
    }
  };

  return {
    ...featureOptions,
    activate,
    getState,
    setState,
    persistState,
    useStore: useFeatureStore,
  };
}
