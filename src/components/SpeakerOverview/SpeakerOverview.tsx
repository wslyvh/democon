import { Loader } from 'components/Loader';
import React, { useEffect, useState } from 'react';
import EventService from 'services/EventService';
import { Speaker } from 'types/Speaker';
import { SubmissionLinks } from './SubmissionLinks';

export function SpeakerOverview() {
  const [speakers, setSpeakers] = useState({
    loading: true,
    data: new Array<Speaker>(),
    error: false,
  });

  useEffect(() => {
    async function asyncEffect() {
      const speakers = await EventService.GetSpeakers();

      setSpeakers({
        loading: false,
        data: speakers ? speakers.data : [],
        error: speakers === undefined ? true : false,
      });
    }

    asyncEffect();
  }, []);

  if (speakers.loading) {
    return <Loader />;
  }

  if (speakers.error) {
    return <small>Couldn't retrieve speakers..</small>;
  }

  if (speakers.data?.length === 0) {
    return <small>No speakers found..</small>;
  }

  return (
    <div>
      {speakers.data.map((i: Speaker) => {
        return (
          <div className="card mb-2" key={i.code}>
            <div className="card-body">
              <h5 className="card-title">{i.name}</h5>
              <p className="card-text">{i.biography}</p>
              {i.submissions && <SubmissionLinks submissions={i.submissions} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
