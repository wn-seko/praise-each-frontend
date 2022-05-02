import React from 'react';
import { RecoilRoot } from 'recoil';
import Routes from '~/Routes';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/layouts/theme';

import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';

const App = () => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
