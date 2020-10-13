import { SpeakerOverview } from 'components/SpeakerOverview';
import React, { useEffect, useState } from 'react';
import EventService from 'services/EventService';
import { Speaker } from 'types/Speaker';

export function Speakers() {
  const [speakers, setSpeakers] = useState(new Array<Speaker>());

  useEffect(() => {
    async function asyncEffect() {
      const speakers = await EventService.GetSpeakers();

      if (speakers) {
        setSpeakers(speakers.data);
      }
    }

    asyncEffect();
  }, []);

  return (
    <div>
      <h2>Speaker overview</h2>
      { speakers.length === 0 && <small>No speakers found..</small> }

      {speakers?.length > 0 && <SpeakerOverview />}
    </div>
  );
}
