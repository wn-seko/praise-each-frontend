import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';

type Segment = {
  Item: typeof SegmentItem;
};

interface SegmentProps {
  title: React.ReactNode;
}

const Segment: Segment & FC<SegmentProps> = ({ title, children }) => (
  <Box>
    <Heading size="md" as="h3" mb={4}>
      {title}
    </Heading>
    <Box borderWidth={2} padding={4} borderRadius={4} borderStyle="solid" borderColor="gray.200">
      <Flex direction="column" gap={8}>
        {children}
      </Flex>
    </Box>
  </Box>
);

interface SegmentItemProps {
  title: React.ReactNode;
}

const SegmentItem: FC<SegmentItemProps> = ({ title, children }) => (
  <Flex direction="column" gap={4}>
    <Heading fontWeight="bold" size="sm" as="h4">
      {title}
    </Heading>
    {children}
  </Flex>
);

Segment.Item = SegmentItem;

export default Segment;
