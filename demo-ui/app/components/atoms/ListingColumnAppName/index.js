import React from 'react';

import {
  CapRow,
  CapColumn,
  CapHeading,
  CapTooltipWithInfo,
} from '@capillarytech/cap-ui-library';

export default function index({ record }) {
  return (
    <CapRow type="flex" gutter="8">
      <CapColumn span={22}>
        <CapHeading
          type="h3"
          className="truncate-text"
          style={{ maxWidth: '22ch' }}
          title={record.name}
        >
          {record.name}
        </CapHeading>
      </CapColumn>
      <CapColumn span={2}>
        <CapTooltipWithInfo title={record.description} />
      </CapColumn>
    </CapRow>
  );
}
