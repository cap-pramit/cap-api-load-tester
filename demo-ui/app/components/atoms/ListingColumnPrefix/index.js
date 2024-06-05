import React from 'react';
import { CapRow, CapColumn } from '@capillarytech/cap-ui-library';

export default function index({ record }) {
  return (
    <CapRow>
      <CapColumn>{record.prefixPath}</CapColumn>
    </CapRow>
  );
}
