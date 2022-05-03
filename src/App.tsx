import React from 'react';
import { RecoilRoot } from 'recoil';
import RouterConfig from '~/RouterConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '~/layouts/theme';

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
