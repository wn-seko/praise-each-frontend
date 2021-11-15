import React, { FC } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import TagList from '~/components/domains/Tag/TagList';
import DefaultLayout from '~/layouts/default';
import { chunk } from '~/utils/chunk';
import { useTags } from './hooks';

const TagsPage: FC = () => {
  const { loading, tags } = useTags();
  const tagsChunk = chunk(tags, 4);

  return (
    <DefaultLayout loading={loading}>
      <Container>
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
      </Container>
    </DefaultLayout>
  );
};

export default TagsPage;
