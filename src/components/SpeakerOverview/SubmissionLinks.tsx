import React from 'react';
import { Link } from 'react-router-dom';
import { Submission } from 'types/Submission';

interface SubmissionLinksProps {
  submissions: Submission[];
}

export function SubmissionLinks(props: SubmissionLinksProps) {
  if (props.submissions.length === 0) {
    return <></>;
  }

  return (
    <div>
      {props.submissions.map((i: Submission, index: number) => {
        return (
          <Link
            to={`talk/${i.code}`}
            key={i.code}
            className="btn btn-primary btn-sm mr-2"
          >
            {index + 1}
          </Link>
        );
      })}
    </div>
  );
}
