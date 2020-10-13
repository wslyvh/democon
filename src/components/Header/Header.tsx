import React from "react"

export function Header() {

    return (
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Democon
          </a>
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
  