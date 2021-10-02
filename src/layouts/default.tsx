import React, { FC } from 'react';
import Notification from '~/components/domains/Notification';

const DefaultLayout: FC = ({ children }) => (
  <div className="layout default">
    <div className="page">{children}</div>
    <Notification />
  </div>
);

export default DefaultLayout;
