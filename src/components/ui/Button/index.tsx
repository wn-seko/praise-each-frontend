import { Button, ButtonProps, ComponentWithAs, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export const GithubButton: ComponentWithAs<'button', ButtonProps> = ({ children, ...rest }) => (
  <Button color="white" backgroundColor="#212428" size="lg" {...rest}>
    <Flex alignItems="center" gap={2}>
      <FaGithub size={24} />
      {children}
    </Flex>
  </Button>
);

export const GoogleButton: ComponentWithAs<'button', ButtonProps> = ({ children, ...rest }) => (
  <Button color="white" backgroundColor="#dd4b39" size="lg" {...rest}>
    <Flex alignItems="center" gap={2}>
      <FaGoogle size={24} />
      {children}
    </Flex>
  </Button>
);
