/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.atoms.ListingColumnActivity';

export default defineMessages({
  creationAndUpdateDetails: {
    id: `${scope}.creationAndUpdateDetails`,
    defaultMessage: 'Creation and Update Details',
  },
  createdOn: {
    id: `${scope}.createdOn`,
    defaultMessage: 'Creation on: ',
  },
  updatedOn: {
    id: `${scope}.updatedOn`,
    defaultMessage: 'Updated on: ',
  },
  createdBy: {
    id: `${scope}.createdBy`,
    defaultMessage: 'Created by: ',
  },
  updatedBy: {
    id: `${scope}.updatedBy`,
    defaultMessage: 'Updated by: ',
  },
  lastUpdatedOnBy:{
    id: `${scope}.lastUpdatedOnBy`,
    defaultMessage: 'Last updated on {on} by {by}',
  }
});
