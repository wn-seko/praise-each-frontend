import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { theme } from '~/layouts/theme';
import RouterConfig from '~/RouterConfig';

import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css';

const App = () => (
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <RouterConfig />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);

export default App;
