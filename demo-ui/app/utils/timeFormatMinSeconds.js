import moment from 'moment';

export default function formatTimeInMinSecons(seconds) {
  const duration = moment.duration(Number(seconds), 'seconds');

  // Use moment.js format function with the 'mm:ss' format
  const formatted = moment.utc(duration.asMilliseconds()).format('mm[m] ss[s]');
  return formatted;
}
