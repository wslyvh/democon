import { Loader } from "components/Loader";
import React, { useEffect, useState } from "react"
import EventService from "services/EventService";
import { Speaker } from "types/Speaker";

export function SpeakerOverview() {
  const [speakers, setSpeakers] = useState({ 
    loading: true,
    data: new Array<Speaker>(),
    error: false
  });
  
  useEffect(() => {
    async function asyncEffect() {
      const speakers = await EventService.GetSpeakers();

      setSpeakers({
          loading: false,
          data: speakers ? speakers.data : [],
          error: speakers === undefined ? true : false 
      });
    }

    asyncEffect();
  }, []);

  if (speakers.loading) {
    return <Loader />
  }

  if (speakers.error) {
    return <small>Couldn't retrieve speakers..</small>
  }

  if (speakers.data?.length === 0) {
    return <small>No speakers found..</small>
  }

  return (
    <div>
      <p>Overview of all speakers..</p>
    </div>
  )
}
  