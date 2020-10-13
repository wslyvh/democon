import React, { ReactNode, useEffect, useState } from 'react';
import { EventContext } from 'context/EventContext';
import EventService from 'services/EventService';
import { EventInfo } from 'types/EventInfo';

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const [event, setEvent] = useState<EventInfo | undefined>(undefined);

  useEffect(() => {
    async function getEventInfo() {
      const eventInfo = await EventService.GetEventInfo();

      if (eventInfo) {
        setEvent(eventInfo);
      }
    }

    getEventInfo();
  }, []);

  return (
    <EventContext.Provider value={event}>{children}</EventContext.Provider>
  );
};
