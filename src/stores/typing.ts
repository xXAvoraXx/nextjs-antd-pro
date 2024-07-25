import { Settings } from '@ant-design/pro-components';

export type IAppStore = IAppStoreLayoutPreferenceSlice & IAppStoreGlobalSlice;



export type IAppStoreLayoutPreferenceSlice = {
  layoutSettings: ILayoutSettingsState;
  setFontSize: (fontSize: number) => void;
  setContentWidth: (contentWidth: Settings['contentWidth']) => void;
  setFixedHeader: (fixedHeader: Settings['fixedHeader']) => void;
  setCompactMode: (isCompactMode: boolean) => void;
}

type ILayoutSettingsState = {
  fontSize: number;
  contentWidth?: Settings['contentWidth'];
  fixedHeader?: Settings['fixedHeader'];
  isCompactMode?: boolean;
}


export type IAppStoreGlobalSlice = {
  currentUser?: API.CurrentUser;
  setCurrentUser: (currentUser: API.CurrentUser) => void;
}