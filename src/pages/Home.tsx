import { EventDaysNav } from 'components/EventDaysNav';
import { SubmissionOverview } from 'components/SubmissionOverview';
import React from 'react';

export default function Home() {
  return (
    <>
      <div>
        <h2>Event Days</h2>
        <EventDaysNav />
      </div>
      <div>
        <h2>All Events</h2>
        <SubmissionOverview />
      </div>
    </>
  );
}
