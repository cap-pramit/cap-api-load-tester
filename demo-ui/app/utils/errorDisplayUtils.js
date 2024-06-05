const scope = 'vulcanWebapp.label.common.error';
import { CapNotification } from '@capillarytech/cap-ui-library';
import messages from '../components/pages/Cap/messages';

/**
 * Formats the error message using the provided formatMessage function.
 * @param {Function} formatMessage - The formatMessage function from react-intl.
 * @param {Object} errorObj - The error object containing the name and message properties.
 * @returns {string} The formatted error message.
 */
export function formatErrorMessage(formatMessage, errorObj = {}) {
  const id = errorObj?.name
    ? `${scope}.${errorObj.name}`
    : messages['genericErrorMsg']?.id;
  const defaultMessage =
    errorObj?.message || messages['genericErrorMsg']?.defaultMessage;
    CapNotification.error({
      message: formatMessage({ id, defaultMessage }),
    });
}

/**
 * Returns the formatted message props for the given error object.
 * @param {Object} errorObj - The error object containing the name and message properties.
 * @returns {Object} The formatted message props.
 */
export function getFormattedMessageProps(errorObj = {}) {
  const id = errorObj?.name
    ? `${scope}.${errorObj.name}`
    : messages['genericErrorMsg']?.id;
  const defaultMessage =
    errorObj?.message || messages['genericErrorMsg']?.defaultMessage;
  return {
    id,
    defaultMessage,
  };
}
