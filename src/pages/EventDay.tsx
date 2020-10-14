import { EventDayCalendar } from 'components/EventDayCalendar';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Talk() {
  const { date } = useParams();
  const currentDate = moment(date);

  return (
    <div>
      <h2>{currentDate.format('LL')}</h2>
    </div>
  );
}
