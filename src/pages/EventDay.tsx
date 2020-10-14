import { EventDayCalendar } from 'components/EventDayCalendar';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Talk() {
  const { date } = useParams();
  const currentDate = moment(date);

  return (
    <>
      <div>
        <EventDayCalendar selectedDate={currentDate.toDate()} />
      </div>
    </>
  );
}
