/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.atoms.RbacTooltipWrapper';

export default defineMessages({
  accessDenied: {
    id: `${scope}.accessDenied`,
    defaultMessage: 'Access denied',
  },
});
