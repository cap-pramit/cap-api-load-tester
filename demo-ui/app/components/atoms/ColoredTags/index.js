import React from 'react';

import { CapRow, CapColoredTag } from '@capillarytech/cap-ui-library';

import { TAG_COLOR_MAPPING, TAG_TEXT_COLOR } from './constants';

export default function Index({ tagValue, tagColor = '', tagTextColor = '' }) {
  const tagColorValue = tagColor ? tagColor : TAG_COLOR_MAPPING[tagValue];
  const tagTextColorValue = tagTextColor
    ? tagTextColor
    : TAG_TEXT_COLOR[tagValue];
  return (
    <>
      <CapRow type="flex">
        <CapColoredTag
          tagColor={tagColorValue}
          tagTextColor={tagTextColorValue}
          className="capitalize-text"
        >
          {tagValue}
        </CapColoredTag>
      </CapRow>
    </>
  );
}
