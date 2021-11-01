import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Button, ButtonProps, Icon } from 'semantic-ui-react';

const GithubButtonBase = styled(Button)`
  color: #fff !important;
  background-color: #212428 !important;
`;

const GoogleButtonBase = styled(Button)`
  color: #fff !important;
  background-color: #dd4b39 !important;
`;

const ButtonText = styled.span`
  vertical-align: middle;
`;

export const GithubButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <GithubButtonBase {...rest}>
    <Icon className="button" name="github" size="large" /> <ButtonText>{children}</ButtonText>
  </GithubButtonBase>
);

export const GoogleButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <GoogleButtonBase {...rest}>
    <Icon className="button" name="google" size="large" /> <ButtonText>{children}</ButtonText>
  </GoogleButtonBase>
);
