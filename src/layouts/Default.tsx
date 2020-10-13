import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from 'components/Header';
import { Loader } from 'components/Loader';

const HomePage = lazy(() => import('pages/Home'));
const SpeakersPage = lazy(() => import('pages/Speakers'));

export function Default() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Suspense fallback={<Loader />}>
          <Switch>
            <div className="container">
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/speakers">
                <SpeakersPage />
              </Route>
              <Redirect to="/" />
            </div>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
