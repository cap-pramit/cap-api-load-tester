/*
 * RedirectToLoginPage Messages
 *
 * This contains all the text for the RedirectToLoginPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.RedirectToLoginPage.header',
    defaultMessage: 'Redirecting to login page…',
  },
  message: {
    id: 'app.components.RedirectToLoginPage.message',
    defaultMessage: 'Looks like your previous session has expired.',
  },
  loginAgainMessage: {
    id: 'app.components.RedirectToLoginPage.loginAgainMessage',
    defaultMessage: 'For security reasons, you would have to login again.',
  },
});
