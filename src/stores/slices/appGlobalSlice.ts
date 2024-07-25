import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IAppStore, IAppStoreGlobalSlice } from '../typing';

export const appGlobalSlice: StateCreator<
  IAppStore,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  IAppStoreGlobalSlice
> = (set) => ({
  setCurrentUser: (currentUser) => {
    set(
      produce((state) => {
        state.currentUser = currentUser;
      }),
    );
  },
});
