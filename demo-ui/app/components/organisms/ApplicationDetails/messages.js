/*
 * ApplicationDetails Messages
 *
 * This contains all the text for the ApplicationDetails component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.organisms.ApplicationDetails';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ApplicationDetails component!',
  },
  appName: {
    id: `${scope}.appName`,
    defaultMessage: 'Name',
  },
  appId: {
    id: `${scope}.appId`,
    defaultMessage: 'Application ID',
  },
  appDescription: {
    id: `${scope}.appDescription`,
    defaultMessage: 'Description',
  },
  appPrefixPath: {
    id: `${scope}.appPrefixPath`,
    defaultMessage: 'Prefix path',
  },
  appReadmeLink: {
    id: `${scope}.appReadmeLink`,
    defaultMessage: 'Readme link',
  },
  appType: {
    id: `${scope}.appType`,
    defaultMessage: 'Type',
  },
  appLanguage: {
    id: `${scope}.appLanguage`,
    defaultMessage: 'Language',
  },
  customDomain: {
    id: `${scope}.customDomain`,
    defaultMessage: 'Custom domain',
  },
  appCreatedBy: {
    id: `${scope}.appCreatedBy`,
    defaultMessage: 'Created by',
  },
  appCreatedAt: {
    id: `${scope}.appCreatedAt`,
    defaultMessage: 'Created on',
  },
  appUpdatedBy: {
    id: `${scope}.appUpdatedBy`,
    defaultMessage: 'Updated by',
  },
  appUpdatedAt: {
    id: `${scope}.appUpdatedAt`,
    defaultMessage: 'Updated on',
  },
  uatUrl: {
    id: `${scope}.uatUrl`,
    defaultMessage: 'UAT url',
  },
  prodUrl: {
    id: `${scope}.prodUrl`,
    defaultMessage: 'Prod url',
  },
  customDomainUrl: {
    id: `${scope}.customDomainUrl`,
    defaultMessage: 'Custom domain url',
  },
  uatEnabledBy: {
    id: `${scope}.uatEnabledBy`,
    defaultMessage: 'UAT enabled by',
  },
  prodEnabledBy: {
    id: `${scope}.prodEnabledBy`,
    defaultMessage: 'Prod enabled by',
  },
  uatEnabledOn: {
    id: `${scope}.uatEnabledOn`,
    defaultMessage: 'UAT enabled on',
  },
  prodEnabledOn: {
    id: `${scope}.prodEnabledOn`,
    defaultMessage: 'Prod enabled on',
  },
  appIsActive: {
    id: `${scope}.appIsActive`,
    defaultMessage: 'Active',
  },
  appAuthType: {
    id: `${scope}.appAuthType`,
    defaultMessage: 'Auth type',
  },
  appAuthIdentifier: {
    id: `${scope}.appAuthIdentifier`,
    defaultMessage: 'Auth identifier',
  },
  appTranslationsEnabled: {
    id: `${scope}.appTranslationsEnabled`,
    defaultMessage: 'Translations enabled',
  },
  appTranslationsType: {
    id: `${scope}.appTranslationsType`,
    defaultMessage: 'Translations type',
  },
  appLocizeProjectName: {
    id: `${scope}.appLocizeProjectName`,
    defaultMessage: 'Locize project name',
  },
  appTranslationApiServiceName: {
    id: `${scope}.appTranslationApiServiceName`,
    defaultMessage: 'Translation api service name',
  },
  issueLoadingAppDetails: {
    id: `${scope}.issueLoadingAppDetails`,
    defaultMessage: 'Issue loading application details',
  },
  onBy: {
    id: `${scope}.onBy`,
    defaultMessage: '{time} by {user}',
  },
  more: {
    id: `${scope}.more`,
    defaultMessage: ' + {count} more orgs',
  },
  accessibleOrgs: {
    id: `${scope}.accessibleOrgs`,
    defaultMessage: 'Also accessible to',
  },
});
