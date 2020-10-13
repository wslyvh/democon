import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from 'components/Header';
import { Home } from 'pages/Home';
import { Speakers } from 'pages/Speakers';

export function Default() {
  return (
    <div>
      <Header />

      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/speakers">
              <Speakers />
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
