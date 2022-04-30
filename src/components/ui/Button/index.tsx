import React from 'react';
import { Button, ButtonProps, ComponentWithAs } from '@chakra-ui/react';

export const GithubButton: ComponentWithAs<'button', ButtonProps> = ({ children, ...rest }) => (
  <Button color="white" backgroundColor="#212428" size="lg" {...rest}>
    {children}
  </Button>
);

export const GoogleButton: ComponentWithAs<'button', ButtonProps> = ({ children, ...rest }) => (
  <Button color="white" backgroundColor="#dd4b39" size="lg" {...rest}>
    {children}
  </Button>
);
