import { Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { FC, useEffect } from 'react';

const StyledScrollLoader = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ScrollLoaderProps {
  loading: boolean;
  onInRange?: () => void;
}

const ScrollLoader: FC<ScrollLoaderProps> = ({ loading, onInRange }) => {
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const listener = () => {
      if (!ref.current || loading) {
        return;
      }

      const scrollTop = window.scrollY;
      const elementTop = ref.current.offsetTop - ref.current.scrollTop;
      const isInRange = scrollTop + window.innerHeight > elementTop;

      if (onInRange && isInRange) {
        onInRange();
      }
    };

    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [ref]);

  return <StyledScrollLoader ref={ref}>{loading && <Spinner size="md" />}</StyledScrollLoader>;
};

export default ScrollLoader;
