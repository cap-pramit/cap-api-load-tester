import React from 'react';
import {
  CapRow,
  CapColumn,
  CapIcon,
  CapTooltip,
} from '@capillarytech/cap-ui-library';

/**
 * Renders a Icon - tick or blank with tooltip with some text.
 * @param {boolean} showTick - Determines whether to show the tick icon. Default is true.
 * @param {string} tooltipTitle - The title for the tooltip.
 * @returns {JSX.Element} The custom domain listing column component.
 */
export default function index({
  showTick = true,
  showProgress,
  tooltipTitle = '',
  tickSize = 's',
}) {
  return (
    <CapRow type="flex" justify="center">
      <CapColumn>
        {showProgress ? <CapIcon type="refreshCircle" className="rotate-continuous progress-icon" /> : (
          showTick ? (
            <CapTooltip title={tooltipTitle}>
              <CapIcon className="rotate-full" type="check-filled" size={tickSize} />
            </CapTooltip>
          ) : (
            <CapIcon type="minus" size="s" />
          )
        )}
      </CapColumn>
    </CapRow>
  );
}
