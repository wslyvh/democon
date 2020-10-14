import React from 'react';
import { getRoomColor } from 'utils/format';

interface RoomFilterProps {
  rooms: Array<string>;
  onSelect: (room: string) => void;
}

export const RoomFilter = (props: RoomFilterProps) => {
  return (
    <div className="text-center mb-4">
      {props.rooms.map((i: string) => {
        return (
          <button
            key={i.toString()}
            className="btn btn-outline-secondary m-2"
            type="button"
            id="search-button"
            onClick={() => props.onSelect(i)}
            style={{
              border: 2,
              borderStyle: 'solid',
              borderColor: getRoomColor(i),
            }}
          >
            {i}
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
