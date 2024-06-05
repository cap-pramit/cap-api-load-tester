/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope =
  'vulcanWebapp.components.molecules.DeleteConfirmationModal';

export default defineMessages({
  btnEnabledInSec: {
    id: `${scope}.btnEnabledInSec`,
    defaultMessage: 'Button will be enabled in {value} seconds',
  },
  noButton: {
    id: `${scope}.noButton`,
    defaultMessage: 'No',
  },
  yesButton: {
    id: `${scope}.yesButton`,
    defaultMessage: 'Yes {value}',
  },
});
