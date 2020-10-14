import React from 'react';
import { Speaker } from 'types/Speaker';

interface SpeakerListProps {
  speakers: Array<Speaker>;
}

export function SpeakerList(props: SpeakerListProps) {
  return (
    <div>
      <h4>Speakers</h4>

      {props.speakers.map((i) => {
        return (
          <div className="card mb-2" key={i.code}>
            <div className="card-body">
              <h5 className="card-title">{i.name}</h5>
              <p className="card-text">{i.biography}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
