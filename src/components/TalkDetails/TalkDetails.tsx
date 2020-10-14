import React, { useEffect, useState } from 'react';
import EventService from 'services/EventService';
import { Submission } from 'types/Submission';

interface TalkDetailsProps {
  id: string;
}

type DefaultStateType<T> = {
  loading: boolean;
  data: T | undefined;
  error: boolean;
};

export function TalkDetails(props: TalkDetailsProps) {
  const [submission, setSubmission] = useState<DefaultStateType<Submission>>();

  useEffect(() => {
    async function asyncEffect() {
      const submission = await EventService.GetTalk(props.id);
      console.log(submission);
      setSubmission({
        loading: false,
        data: submission,
        error: submission === undefined ? true : false,
      });
    }

    asyncEffect();
  }, [props.id]);

  if (submission?.data === undefined) {
    return <></>;
  }

  return (
    <div>
      <h3>{submission.data.title}</h3>
    </div>
  );
}
