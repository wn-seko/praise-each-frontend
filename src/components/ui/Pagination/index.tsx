import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

interface PaginationProps {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ activePage, totalPages, onPageChange }) => {
  const disabledPrev = activePage <= 1;
  const disabledNext = activePage >= totalPages;

  const onClickPrev = () => {
    if (!disabledPrev) {
      onPageChange(activePage - 1);
    }
  };
  const onClickNext = () => {
    if (!disabledNext) {
      onPageChange(activePage + 1);
    }
  };

  return (
    <Flex alignItems="center" lineHeight={1} gap={4} fontSize="1.2rem">
      <FaAngleLeft
        cursor={disabledPrev ? 'inherit' : 'pointer'}
        size="1em"
        color={disabledPrev ? 'gray' : 'inherit'}
        onClick={onClickPrev}
      />
      {activePage} / {totalPages}
      <FaAngleRight
        cursor={disabledNext ? 'inherit' : 'pointer'}
        size="1em"
        color={disabledNext ? 'gray' : 'inherit'}
        onClick={onClickNext}
      />
    </Flex>
  );
};

export default Pagination;
