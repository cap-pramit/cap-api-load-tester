/*
 * ViewApplication Messages
 *
 * This contains all the text for the ViewApplication component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.pages.ViewApplication';

export default defineMessages({
  applicationDetails: {
    id: `${scope}.applicationDetails`,
    defaultMessage: 'Application details',
  },
  deployments: {
    id: `${scope}.deployments`,
    defaultMessage: 'Deployments',
  },
  viewApplication: {
    id: `${scope}.viewApplication`,
    defaultMessage: 'View application',
  }
});
