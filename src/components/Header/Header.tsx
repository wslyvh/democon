import React from 'react';
import { useEventInfo } from 'hooks/useEventInfo';
import { Link } from 'react-router-dom';

export function Header() {
  const event = useEventInfo();

  let eventDates =
    event?.from && event?.to ? (
      <span>
        {event?.from.toLocaleDateString()} - {event?.to.toLocaleDateString()}
      </span>
    ) : (
      <></>
    );

  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          DemoCon
        </Link>
        <small className="text-muted">{eventDates}</small>
        <div className="ml-auto mr-1">
          <ul className="navbar-nav text-right">
            <li className="nav-item">
              <Link to="/speakers" className="nav-link">
                Speakers
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
