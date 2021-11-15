import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Container, Grid, Message } from 'semantic-ui-react';
import TagList from '~/components/domains/Tag/TagList';
import DefaultLayout from '~/layouts/default';
import { chunk } from '~/utils/chunk';
import CreateTag from './CreateTag';
import { useTags } from './hooks';

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 1.5em;
`;

const TagsPage: FC = () => {
  const { loading, tags, refresh } = useTags();
  const tagsChunk = chunk(tags, 4);

  return (
    <DefaultLayout loading={loading}>
      <Container>
        <ButtonContainer>
          <CreateTag refresh={refresh} />
        </ButtonContainer>
        {tags.length > 0 ? (
          <Grid>
            <Grid.Row>
              {tagsChunk.map((tags, index) => (
                <Grid.Column width={4} key={`tagChunk_${index}`}>
                  <TagList>
                    {tags.map((tag) => (
                      <TagList.Item key={tag.id} tag={tag} onClickDelete={tag.onDelete} />
                    ))}
                  </TagList>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        ) : (
          <Message info={true} content="まだタグが登録されていません" />
        )}
      </Container>
    </DefaultLayout>
  );
};

export default TagsPage;
