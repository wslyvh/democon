import React from "react"
import { useEventInfo } from "hooks/useEventInfo";

export function Header() {
  const event = useEventInfo();

    return (
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            DemoCon
          </a>
          <small className="text-muted">{event?.from.toLocaleDateString()}</small>
          <div className="ml-auto mr-1">
            <ul className="navbar-nav text-right">
              <li className="nav-item">
                <a href="/speakers" className="nav-link">
                  Speakers
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
  