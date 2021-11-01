import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Header } from 'semantic-ui-react';

const StyledSegmentContainer = styled.div`
  margin: 1em 0 4em;
`;

interface SegmentContainerProps {
  title: React.ReactNode;
}

const SegmentContainer: FC<SegmentContainerProps> = ({ title, children }) => (
  <StyledSegmentContainer>
    <Header as="h3">{title}</Header>
    {children}
  </StyledSegmentContainer>
);

export default SegmentContainer;
