import React from 'react';
import { getBadgeType } from 'utils/format';

interface TrackBadgeProps {
  type: string;
}

export function TrackBadge(props: TrackBadgeProps) {
  return (
    <span className={`badge badge-pill ${getBadgeType(props.type)}`}>
      {props.type}
    </span>
  );
}
