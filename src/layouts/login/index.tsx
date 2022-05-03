import React, { FC } from 'react';

import Notification from '~/components/domains/Notification';

const LoginLayout: FC = ({ children }) => (
  <div className="layout login">
    {children}
    <Notification />
  </div>
);

export default LoginLayout;
