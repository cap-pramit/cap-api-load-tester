/*
 * CreateApplication Messages
 *
 * This contains all the text for the CreateApplication component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.pages.CreateApplication';

export default defineMessages({
  createApplication: {
    id: `${scope}.createApplication`,
    defaultMessage: 'Create application',
  },
  editApplication: {
    id: `${scope}.editApplication`,
    defaultMessage: 'Update application',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  namePlaceholder: {
    id: `${scope}.namePlaceholder`,
    defaultMessage: 'Enter application name',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  descriptionPlaceholder: {
    id: `${scope}.descriptionPlaceholder`,
    defaultMessage: 'Enter application description',
  },
  readme: {
    id: `${scope}.readme`,
    defaultMessage: 'Readme',
  },
  readmePlaceholder: {
    id: `${scope}.readmePlaceholder`,
    defaultMessage: 'Enter readme link',
  },
  prefixPath: {
    id: `${scope}.prefixPath`,
    defaultMessage: 'Prefix Path',
  },
  prefixPathPlaceholder: {
    id: `${scope}.prefixPathPlaceholder`,
    defaultMessage: 'Enter prefix path',
  },
  appType: {
    id: `${scope}.appType`,
    defaultMessage: 'Application Type',
  },
  nativeAppType: {
    id: `${scope}.nativeAppType`,
    defaultMessage: 'Native',
  },
  externalAppType: {
    id: `${scope}.externalAppType`,
    defaultMessage: 'External',
  },
  globalAppType: {
    id: `${scope}.globalAppType`,
    defaultMessage: 'Global',
  },
  nativeAppTypeInfo: {
    id: `${scope}.nativeAppTypeInfo`,
    defaultMessage: 'Native applications are embedded in the InTouch platform and accessible to the organizations they are created for.',
  },
  externalAppTypeInfo: {
    id: `${scope}.externalAppTypeInfo`,
    defaultMessage: 'External apps are organization specific micro-sites or standalone apps hosted on vulcan platform.',
  },
  globalAppTypeInfo: {
    id: `${scope}.globalAppTypeInfo`,
    defaultMessage: 'Global applications are embedded in the InTouch platform and accessible to all the organizations. You can only create them in Capillary Technologies organization.',
  },
  globalAppTypeInfoGlobalConfig: {
    id: `${scope}.globalAppTypeInfoGlobalConfig`,
    defaultMessage: 'Global applications are not allowed in this cluster. Please contact Capillary tech team for more details',
  },
  customDomain: {
    id: `${scope}.customDomain`,
    defaultMessage: 'Custom Domain',
  },
  customDomainPlaceholder: {
    id: `${scope}.customDomainPlaceholder`,
    defaultMessage: 'Enter custom domain where you want to host the application',
  },
  appAuthType: {
    id: `${scope}.appAuthType`,
    defaultMessage: 'Authentication Type',
  },
  otpAuthType: {
    id: `${scope}.otpAuthType`,
    defaultMessage: 'OTP',
  },
  passwordAuthType: {
    id: `${scope}.passwordAuthType`,
    defaultMessage: 'Password',
  },
  dualScreenAuthType: {
    id: `${scope}.dualScreenAuthType`,
    defaultMessage: 'Dual Screen',
  },
  appTranslationType: {
    id: `${scope}.appTranslationType`,
    defaultMessage: 'I18n Type',
  },
  intouchTranslationType: {
    id: `${scope}.intouchTranslationType`,
    defaultMessage: 'InTouch',
  },
  customTranslationType: {
    id: `${scope}.customTranslationType`,
    defaultMessage: 'Custom',
  },
  appEnableAuth: {
    id: `${scope}.appEnableAuth`,
    defaultMessage: 'Enable Authentication',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  otpIdentifier: {
    id: `${scope}.otpIdentifier`,
    defaultMessage: 'Identifier',
  },
  mobileIdentifier: {
    id: `${scope}.mobileIdentifier`,
    defaultMessage: 'Mobile',
  },
  emailIdentifier: {
    id: `${scope}.emailIdentifier`,
    defaultMessage: 'Email',
  },
  appEnableTranslation: {
    id: `${scope}.appEnableTranslation`,
    defaultMessage: 'Enable I18n',
  },
  locizeProjectName: {
    id: `${scope}.locizeProjectName`,
    defaultMessage: 'Locize Project Name',
  },
  locizeProjectNamePlaceholder: {
    id: `${scope}.locizeProjectNamePlaceholder`,
    defaultMessage: 'Enter locize project name',
  },
  locizeProjectId: {
    id: `${scope}.locizeProjectId`,
    defaultMessage: 'Locize Project Id',
  },
  locizeProjectIdPlaceholder: {
    id: `${scope}.locizeProjectIdPlaceholder`,
    defaultMessage: 'Enter locize project id',
  },
  locizeProjectKey: {
    id: `${scope}.locizeProjectKey`,
    defaultMessage: 'Locize Project Key',
  },
  locizeProjectKeyPlaceholder: {
    id: `${scope}.locizeProjectKeyPlaceholder`,
    defaultMessage: 'Enter locize project key',
  },
  translationApiJson: {
    id: `${scope}.translationApiCurl`,
    defaultMessage: 'I18n API JSON config',
  },
  translationApiJsonPlaceholder: {
    id: `${scope}.translationApiJsonPlaceholder`,
    defaultMessage: 'JSON config for I18n API',
  },
  invalidAppName: {
    id: `${scope}.invalidAppName`,
    defaultMessage: '1-30 characters with lowercase, hyphens, underscores, digits, and at least one lowercase letter required.',
  },
  invalidPrefixPath: {
    id: `${scope}.invalidPrefixPath`,
    defaultMessage: 'Invalid prefix path. It should start with / and can contain lowercase, uppercase, hyphens, and underscores.',
  },
  invalidReadmeLink: {
    id: `${scope}.invalidReadmeLink`,
    defaultMessage: 'Readme link field should be a valid full URL of readme, e.g: https://github.com/your/app/repo/blob/master/README.md',
  },
  invalidCustomDomain: {
    id: `${scope}.invalidCustomDomain`,
    defaultMessage: 'Custom domain field should be a valid domain name, e.g: demoapps.capillary.co.in',
  },
  invalidTranslationApiJson: {
    id: `${scope}.invalidTranslationApiJson`,
    defaultMessage: 'Please provide valid JSON config for I18n API',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  applicationId: {
    id: `${scope}.applicationId`,
    defaultMessage: 'Application ID',
  },
  applicationIdPlaceholder: {
    id: `${scope}.applicationIdPlaceholder`,
    defaultMessage: 'Auto-generated application ID will be displayed here once you validate application name.',
  },
  appNameDuplicateError: {
    id: `${scope}.appNameDuplicateError`,
    defaultMessage: 'Application name already exists, please choose a different name.',
  },
  comingSoon: {
    id: `${scope}.comingSoon`,
    defaultMessage: 'Coming Soon! Stay tuned for updates.',
  },
  locizeApiLocale: {
    id: `${scope}.locizeApiLocale`,
    defaultMessage: 'Test Locale',
  },
  locizeApiLocalePlaceholder: {
    id: `${scope}.locizeApiLocalePlaceholder`,
    defaultMessage: 'Enter locale to test api',
  },
  test: {
    id: `${scope}.test`,
    defaultMessage: 'Test',
  },
  locizeApiLocaleInfoText: {
    id: `${scope}.locizeApiLocaleInfoText`,
    defaultMessage: 'Note: This is only to test I18n API config, this will not be stored.',
  },
  invalidLocizeProjectName: {
    id: `${scope}.invalidLocizeProjectName`,
    defaultMessage: 'Please provide valid locize project name',
  },
  invalidLocizeProjectId: {
    id: `${scope}.invalidLocizeProjectId`,
    defaultMessage: 'Please provide valid locize project id',
  },
  invalidLocizeProjectKey: {
    id: `${scope}.invalidLocizeProjectKey`,
    defaultMessage: 'Please provide valid locize project key',
  },
  applicationCreatedSuccess: {
    id: `${scope}.applicationCreatedSuccess`,
    defaultMessage: 'Application created successfully!',
  },
  applicationUpdatedSuccess: {
    id: `${scope}.applicationUpdatedSuccess`,
    defaultMessage: 'Application updated successfully!',
  },
  basicDetailsTitle: {
    id: `${scope}.basicDetailsTitle`,
    defaultMessage: 'Basic Details',
  },
  basicDetailsDescription: {
    id: `${scope}.basicDetailsDescription`,
    defaultMessage: 'Configure application level details here.',
  },
  authDetailsTitle: {
    id: `${scope}.authDetailsTitle`,
    defaultMessage: 'Authentication Details',
  },
  authDetailsDescription: {
    id: `${scope}.authDetailsDescription`,
    defaultMessage: 'Configure authentication for your application here (for external apps only)',
  },
  i18nDetailsTitle: {
    id: `${scope}.i18nDetailsTitle`,
    defaultMessage: 'Internationalization Details',
  },
  i18nDetailsDescription: {
    id: `${scope}.i18nDetailsDescription`,
    defaultMessage: 'Configure internationalization for your application here.',
  },
  onlyUsedWithInTouchApps: {
    id: `${scope}.onlyUsedWithInTouchApps`,
    defaultMessage: 'Can only be used with InTouch apps',
  },
  globalAppTypeAlert: {
    id: `${scope}.globalAppTypeAlert`,
    defaultMessage: 'Global applications cannot be modified after they are created.',
  },
  accessibleOrgs: {
    id: `${scope}.accessibleOrgs`,
    defaultMessage: 'Shared with other organizations',
  },
  accessibleOrgsPlaceholder: {
    id: `${scope}.accessibleOrgsPlaceholder`,
    defaultMessage: 'Select other organizations that can access this application',
  },
  accessibleOrgsSelectText: {
    id: `${scope}.accessibleOrgsSelectText`,
    defaultMessage: 'Select organizations',
  },
  searchOrganizations: {
    id: `${scope}.searchOrganizations`,
    defaultMessage: 'Search organizations',
  },
});
