// tslint:disable:jsx-no-lambda
import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from '~/components/functional/Auth';
import LoginPage from '~/pages/Login';
import OAuthCallbackPage from '~/pages/OauthCallback';
import StatisticsPage from '~/pages/Statistics';
import TeamsPage from '~/pages/Teams';
import TopPage from '~/pages/Top';
import UsersPage from '~/pages/Users';

import MySettings from './pages/MySettings';
import NotFoundPage from './pages/NotFound';
import TagsPage from './pages/Tags';
import TeamPage from './pages/Team';

const withAuth = (element: React.ReactNode) => (
  <Auth requireLogin={true} to="/login">
    {element}
  </Auth>
);

const withoutAuth = (element: React.ReactNode) => (
  <Auth requireLogin={false} to="/">
    {element}
  </Auth>
);

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index={true} element={withAuth(<TopPage />)} />
      <Route path="/tags" element={withAuth(<TagsPage />)} />
      <Route path="/users" element={withAuth(<UsersPage />)} />
      <Route path="/teams" element={withAuth(<TeamsPage />)} />
      <Route path="/teams/:teamId" element={withAuth(<TeamPage />)} />
      <Route path="/statistics" element={withAuth(<StatisticsPage />)} />
      <Route path="/mypage/settings" element={withAuth(<MySettings />)} />
      <Route path="/login" element={withoutAuth(<LoginPage />)} />
      <Route path="/oauth/github/callback" element={<OAuthCallbackPage type="github" />} />
      <Route path="/oauth/google/callback" element={<OAuthCallbackPage type="google" />} />
      <Route path="/notfound" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
