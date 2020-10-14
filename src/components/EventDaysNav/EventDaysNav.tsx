import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventService from 'services/EventService';

export function EventDaysNav() {
  const [eventDates, setEventDates] = useState(new Array<Date>());

  useEffect(() => {
    async function asyncEffect() {
      const talks = await EventService.GetTalks('', '', '', 100, 0);
      const dates = EventService.GetEventDates(talks?.data ? talks.data : []);

      setEventDates(dates);
    }

    asyncEffect();
  }, []);

  if (eventDates?.length === 0) {
    return <></>;
  }

  return (
    <div className="text-center mb-4">
      {eventDates.map((i: Date) => {
        return (
          <Link
            to={'event/' + moment(i).format('YYYYMMDD')}
            className="btn btn-outline-secondary m-2"
          >
            {i.toDateString()}
          </Link>
        );
      })}
    </div>
  );
}
