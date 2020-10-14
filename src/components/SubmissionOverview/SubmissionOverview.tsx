import { Loader } from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventService from 'services/EventService';
import { Submission } from 'types/Submission';
import { getRoomColor } from 'utils/format';
import { RoomFilter } from './RoomFilter';
import { TrackBadge } from './TrackBadge';

export function SubmissionOverview() {
  const [rooms, setRooms] = useState(new Array<string>());
  const [filtered, setFiltered] = useState(new Array<Submission>());
  const [submissions, setSubmissions] = useState({
    loading: true,
    data: new Array<Submission>(),
    error: false,
  });

  useEffect(() => {
    async function asyncEffect() {
      const talks = await EventService.GetTalks('', '', '', 100, 0);
      const data = talks ? talks.data : [];
      const rooms = EventService.GetEventRooms(data);

      setSubmissions({
        loading: false,
        data: data,
        error: talks === undefined ? true : false,
      });

      setFiltered(data);
      setRooms(rooms);
    }

    asyncEffect();
  }, []);

  const onSelectRoom = (room: string) => {
    const filteredData =
      room === 'ALL'
        ? submissions.data
        : submissions.data.filter((i) => i.slot.room['en'] === room);

    setFiltered(filteredData);
  };

  if (submissions.loading) {
    return <Loader />;
  }

  if (submissions.error) {
    return <small>Couldn't retrieve submissions..</small>;
  }

  if (submissions.data?.length === 0) {
    return <small>No submissions found..</small>;
  }

  return (
    <div>
      <RoomFilter rooms={rooms} onSelect={onSelectRoom} />

      {filtered.map((i: Submission) => {
        return (
          <div
            className="card mb-2"
            key={i.code}
            style={{
              borderRight: 5,
              borderRightStyle: 'solid',
              borderRightColor: getRoomColor(i.slot.room['en']),
            }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <Link to={'/talk/' + i.code} className="stretched-link">
                  {i.title}
                </Link>
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                <span className="mr-2">{i.slot.start.toLocaleString()}</span>
                <small>{i.slot.room['en']}</small>
              </h6>
              <p className="card-text">{i.abstract}</p>
              <TrackBadge type={i.track} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
