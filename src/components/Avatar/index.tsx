import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Image } from 'semantic-ui-react';

interface AvatarProps {
  src: string;
  size: 'mini' | 'tiny';
}

const Avatar: FC<AvatarProps> = ({ src, size }) => {
  const AvatarImage = styled(Image)`
    width: ${size === 'mini' ? '2em' : '1.5em'} !important;
    height: auto !important;
  `;

  return <AvatarImage size={size} src={src} avatar={true} />;
};

export default Avatar;
