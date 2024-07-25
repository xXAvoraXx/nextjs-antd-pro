import { produce } from 'immer';
import { StateCreator } from 'zustand';
import config from '@@config/config';
import { IAppStore, IAppStoreLayoutPreferenceSlice } from '../typing';

export const appLayoutPreferenceSlice: StateCreator<
  IAppStore,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  IAppStoreLayoutPreferenceSlice
> = (set) => ({
  layoutSettings: {
    fontSize: 14,
    contentWidth: config.layout.contentWidth,
    fixedHeader: config.layout.fixedHeader,
    isCompactMode: false,
  },
  setFontSize(fontSize) {
    set(
      produce((state) => {
        state.layoutSettings.fontSize = fontSize;
      }),
    );
  },
  setContentWidth(contentWidth) {
    set(
      produce((state) => {
        state.layoutSettings.contentWidth = contentWidth;
      }),
    );
  },
  setFixedHeader(fixedHeader) {
    set(
      produce((state) => {
        state.layoutSettings.fixedHeader = fixedHeader;
      }),
    );
  },
  setCompactMode(isCompactMode) {
    set(
      produce((state) => {
        state.layoutSettings.isCompactMode = isCompactMode;
      }),
    );
  },
});
