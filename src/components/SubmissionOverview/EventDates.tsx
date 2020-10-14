import React from 'react';

interface EventDatesProps {
  dates: Array<Date>;
  onSelect: (date: string) => void;
}

export const EventDates = (props: EventDatesProps) => {
  return (
    <div className="text-center mb-4">
      {props.dates.map((i: Date) => {
        return (
          <button
            key={i.toString()}
            className="btn btn-outline-secondary m-2"
            type="button"
            id="search-button"
            onClick={() => props.onSelect(i.toDateString())}
          >
            {i.toLocaleDateString()}
          </button>
        );
      })}
      <button
        className="btn btn-outline-primary mx-2"
        type="button"
        id="search-button"
        onClick={() => props.onSelect('ALL')}
      >
        All
      </button>
    </div>
  );
};
