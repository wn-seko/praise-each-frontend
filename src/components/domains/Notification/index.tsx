import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const Notification: FC = () => (
  <ToastContainer
    position="top-right"
    theme="colored"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={true}
    pauseOnFocusLoss={true}
    pauseOnHover={true}
  />
);

export default Notification;
