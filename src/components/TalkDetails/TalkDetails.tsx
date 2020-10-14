import { TrackBadge } from 'components/SubmissionOverview/TrackBadge';
import React, { useEffect, useState } from 'react';
import EventService from 'services/EventService';
import { Submission } from 'types/Submission';
import moment from 'moment';

interface TalkDetailsProps {
  id: string;
  setTitle: (title: string | undefined) => void;
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

      setSubmission({
        loading: false,
        data: submission,
        error: submission === undefined ? true : false,
      });
      props.setTitle(submission?.title);
    }

    asyncEffect();
  }, [props]);

  if (submission?.data === undefined) {
    return <></>;
  }

  return (
    <div>
      <h3>
        <small>{submission.data.abstract}</small>
      </h3>
      <p>
        {moment(submission.data.slot.start).format('LT')} -{' '}
        {moment(submission.data.slot.end).format('LT')} (
        {moment(submission.data.slot.end).diff(
          submission.data.slot.start,
          'minutes'
        )}{' '}
        min)
      </p>
      <TrackBadge type={submission.data.track} />
      <p>{submission.data.description}</p>
    </div>
  );
}
