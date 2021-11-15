import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Icon, List } from 'semantic-ui-react';
import { BothContainer } from '~/components/ui/Container';
import { Tag } from '~/domains/tag';

interface TagItemProps {
  tag: Tag;
  onClickDelete?: () => void;
}

const IconButton = styled(Icon)`
  cursor: pointer;
`;

const TagItem: FC<TagItemProps> = ({ tag, onClickDelete }) => {
  return (
    <List.Item key={tag.id}>
      <List.Content>
        <BothContainer>
          <span>{tag.name}</span>
          <IconButton name="trash alternate outline" onClick={onClickDelete} />
        </BothContainer>
      </List.Content>
    </List.Item>
  );
};

export default TagItem;
