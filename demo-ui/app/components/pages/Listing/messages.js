/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.pages.Listing';

export default defineMessages({
  searchPlaceholder: {
    id: `${scope}.searchPlaceholder`,
    defaultMessage: 'Enter appname to search...',
  },
  createApplication: {
    id: `${scope}.createApplication`,
    defaultMessage: 'Create application',
  },
  applicationNameColumn: {
    id: `${scope}.applicationNameColumn`,
    defaultMessage: 'Name',
  },
  repositoryColumn: {
    id: `${scope}.repositoryColumn`,
    defaultMessage: 'Repo',
  },
  activityColumn: {
    id: `${scope}.activityColumn`,
    defaultMessage: 'Activity',
  },
  lastUpdateColumn: {
    id: `${scope}.lastUpdateColumn`,
    defaultMessage: 'Last updated',
  },
  actionsColumn: {
    id: `${scope}.actionsColumn`,
    defaultMessage: 'Actions',
  },
  noApplications: {
    id: `${scope}.noApplications`,
    defaultMessage: 'No Applications Found, Click on Create application to add new application.',
  },
  languageTagsColumn: {
    id: `${scope}.languageTagsColumn`,
    defaultMessage: 'Language',
  },
  typeTagsColumn: {
    id: `${scope}.typeTagsColumn`,
    defaultMessage: 'Type',
  },
  prefixColumn: {
    id: `${scope}.prefixColumn`,
    defaultMessage: 'Prefix path',
  },
  customDomainColumn: {
    id: `${scope}.customDomainColumn`,
    defaultMessage: 'Custom domain',
  },
  multiOrgAccess: {
    id: `${scope}.multiOrgAccess`,
    defaultMessage: 'Multiple org',
  },
  multiOrgTooltip: {
    id: `${scope}.multiOrgTooltip`,
    defaultMessage: 'Shared with {count} orgs',
  },
  vulcanApplications: {
    id: `${scope}.vulcanApplications`,
    defaultMessage: 'Vulcan applications',
  },
  noApplicationsFound: {
    id: `${scope}.noApplicationsFound`,
    defaultMessage:
      'There are no applications found. Click on Create application to add new application.',
  },
});
