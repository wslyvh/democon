import { TalkDetails } from 'components/TalkDetails';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Talk() {
  const { id } = useParams();

  return (
    <div>
      <h2>Talk</h2>

      <div>
        <TalkDetails id={id} />
        <small>
          The submission endpoint doesn't allow for cross-origin requests,
          unfortunately. I didn't implement my own back-end for this assessment.
        </small>
      </div>
    </div>
  );
}
