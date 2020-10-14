import { TalkDetails } from 'components/TalkDetails';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Talk() {
  const { id } = useParams();
  const [title, setTitle] = useState('');

  const onTitleSet = (title: string | undefined) => {
    if (title) setTitle(title);
  };

  return (
    <div>
      <h2>{title}</h2>

      <div>
        <TalkDetails id={id} setTitle={onTitleSet} />
      </div>
    </div>
  );
}
