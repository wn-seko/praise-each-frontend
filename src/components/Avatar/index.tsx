import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Image, ImageProps } from 'semantic-ui-react';

interface AvatarProps {
  src: string;
  size: 'mini' | 'tiny';
}

const AvatarImage = styled(Image)`
  width: ${(props: ImageProps) => (props.size === 'mini' ? '2em' : '1.5em')} !important;
  height: auto !important;
`;

const Avatar: FC<AvatarProps> = ({ src, size }) => <AvatarImage avatarSize={size} src={src} avatar={true} />;

export default Avatar;
