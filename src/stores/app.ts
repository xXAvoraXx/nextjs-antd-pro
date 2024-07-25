import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { appLayoutPreferenceSlice } from './slices/appLayoutPreferenceSlice';
import { IAppStore } from './typing';
import { appGlobalSlice } from './slices/appGlobalSlice';

export const useAppStore = create<
  IAppStore,
  [['zustand/persist', unknown], ['zustand/immer', never]]
>(
  persist(
    immer((...a) => ({
      ...appLayoutPreferenceSlice(...a),
      ...appGlobalSlice(...a),
    })),
    {
      name: 'app-store-preferences',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
