import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  AppointmentModel,
  ViewState,
  SchedulerDateTime,
  Resource,
  ResourceInstance,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import EventService from 'services/EventService';
import { useEffect, useState } from 'react';
import { getRoomColor } from 'utils/format';

interface EventDayCalendarProps {
  selectedDate: Date;
}

export function EventDayCalendar(props: EventDayCalendarProps) {
  const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(
    props.selectedDate
  );
  const [events, setEvents] = useState<Array<AppointmentModel>>([]);
  const [resources, setResources] = useState<Array<Resource>>([]);

  useEffect(() => {
    async function asyncEffect() {
      const talks = await EventService.GetTalks('', '', '', 100, 0);
      const data = talks ? talks.data : [];
      const byDate = data.filter(
        (i) =>
          i.slot.start.toDateString() ===
          new Date(currentDate.toString()).toDateString()
      );

      const events = byDate.map((i) => {
        return {
          id: i.code,
          title: i.title,
          startDate: i.slot.start,
          endDate: i.slot.end,
          type: i.slot.room['en'],
          abstract: i.abstract,
          track: i.track,
        };
      });

      const rooms = events
        .map((i) => {
          return {
            id: i.type,
            text: i.type,
            color: getRoomColor(i.type),
          };
        })
        .filter(
          (item: ResourceInstance, index: number, array: ResourceInstance[]) =>
            array.findIndex((i) => i.id === item.id) === index
        );

      const resources = [
        {
          fieldName: 'type',
          title: 'Type',
          instances: rooms,
        },
      ];

      setEvents(events);
      setResources(resources);
    }

    asyncEffect();
  }, [props.selectedDate, currentDate]);

  if (events.length === 0) {
    return <></>;
  }

  return (
    <Paper>
      <Scheduler data={events}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <Toolbar />
        <DateNavigator />
        <DayView startDayHour={9} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip />
        <Resources data={resources} />
      </Scheduler>
    </Paper>
  );
}
