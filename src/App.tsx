import React from 'react';
import { RecoilRoot } from 'recoil';
import Routes from '~/Routes';

import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-dropdown/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';

const App = () => (
  <RecoilRoot>
    <Routes />
  </RecoilRoot>
);

export default App;
