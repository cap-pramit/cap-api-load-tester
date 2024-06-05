/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.atoms.ListingColumnActions';

export default defineMessages({
  viewApplication: {
    id: `${scope}.viewApplication`,
    defaultMessage: 'View, upload or deploy',
  },
  editApplication: {
    id: `${scope}.editApplication`,
    defaultMessage: 'Edit application',
  },
  globalAppEditNotAllowed: {
    id: `${scope}.globalAppEditNotAllowed`,
    defaultMessage: 'Global applications cannot be modified',
  }
});
