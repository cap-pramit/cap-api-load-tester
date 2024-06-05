import {
  APP_TYPE_NATIVE,
  DEFAULT_LOCALE,
  I18N_TYPES_INTOUCH,
  IDENTIFIER_TYPE_MOBILE,
  INITIAL_TRANSLATION_API_CONFIG,
  LOGIN_TYPE_OTP,
} from './constants';

export const initialState = {
  basicConfig: {
    appName: '',
    needNameValidation: true,
    appDescription: '',
    appReadme: '',
    appPrefixPath: '',
    appType: APP_TYPE_NATIVE,
    appCustomDomain: '',
    accessibleOrgs: [],
  },
  authConfig: {
    appEnableAuth: false,
    externalAppAuthType: LOGIN_TYPE_OTP,
    otpIdentifier: IDENTIFIER_TYPE_MOBILE,
  },
  translationConfig: {
    enableTranslation: true,
    appTranslationType: I18N_TYPES_INTOUCH,
    locizeProjectName: '',
    locizeProjectId: '',
    locizeProjectKey: '',
    translationApiJson: INITIAL_TRANSLATION_API_CONFIG,
    i18nLocale: DEFAULT_LOCALE,
    i18nLocaleIntouch: DEFAULT_LOCALE,
  },
  errorFields: {
    appName: null,
    appPrefixPath: null,
    appReadme: null,
    appCustomDomain: null,
    translationApiJson: null,
    locizeProjectName: null,
    locizeProjectId: null,
    locizeProjectKey: null,
  },
};

export const localReducer = (state, action) => ({
  ...state,
  [action.type]: { ...state[action.type], ...action.updatedConfig },
});
