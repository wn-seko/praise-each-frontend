import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Image, ImageProps } from 'semantic-ui-react';

interface AvatarProps {
  src: string;
  size: 'medium' | 'mini' | 'tiny';
}

const AvatarImage = styled(Image)`
  width: ${(props: ImageProps) => {
    switch (props.size) {
      case 'mini':
        return '2em';
      case 'tiny':
        return '1.5em';
      case 'medium':
        return '3em';
      default:
        return '2em';
    }
  }} !important;
  height: auto !important;
`;

const Avatar: FC<AvatarProps> = ({ src, size }) => <AvatarImage size={size} src={src} avatar={true} />;

export default Avatar;
