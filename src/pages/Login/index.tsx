import { Box, Center, Flex, Spacer, Heading, Skeleton } from '@chakra-ui/react';
import React, { FC } from 'react';

import { GithubButton, GoogleButton } from '~/components/ui/Button';
import { getThemeColor } from '~/layouts/theme';

import { useLogin } from './hooks';

const LoginPage: FC = () => {
  const { loading, urls } = useLogin();

  return (
    <Center w="100vw" h="100vh">
      <Box padding={8} borderRadius={8} border="solid 4px" borderColor={getThemeColor('primary')}>
        <Flex direction="column" align="center" justify="center" gap="1rem">
          <Heading>Praise Each</Heading>
          <Box borderColor={getThemeColor('border')}>みんなで感謝を共有しよう！</Box>
          <Spacer h="1rem" />
          <Flex direction="column" gap="1rem">
            {loading ? (
              <>
                <Skeleton w="200px" h="40px" />
              </>
            ) : (
              <>
                {urls.github && (
                  <GithubButton w="100%" as="a" href={urls.github}>
                    GitHub アカウントでログイン
                  </GithubButton>
                )}
                {urls.google && (
                  <GoogleButton w="100%" as="a" href={urls.google}>
                    Google アカウントでログイン
                  </GoogleButton>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
};

export default LoginPage;
