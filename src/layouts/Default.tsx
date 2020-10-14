import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from 'components/Header';
import { Loader } from 'components/Loader';

const HomePage = lazy(() => import('pages/Home'));
const EventDayPage = lazy(() => import('pages/EventDay'));
const SpeakersPage = lazy(() => import('pages/Speakers'));
const TalkPage = lazy(() => import('pages/Talk'));

export function Default() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Suspense fallback={<Loader />}>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/event/:date">
                <EventDayPage />
              </Route>
              <Route path="/speakers">
                <SpeakersPage />
              </Route>
              <Route path="/talk/:id">
                <TalkPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
