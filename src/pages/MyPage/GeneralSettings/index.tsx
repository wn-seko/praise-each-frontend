import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Button, Header, Icon, Input, Segment } from 'semantic-ui-react';
import { GithubButton, GoogleButton } from '~/components/ui/Button';
import SegmentContainer from '~/components/ui/SegmentContainer';
import { User } from '~/domains/user';
import { useField, useLogin } from './hooks';

const MarginedSegment = styled.div`
  width: 20em;
  min-height: 5em;

  > * {
    margin-bottom: 1em !important;
  }
`;

const InlineContainer = styled.div`
  display: inline;

  > * {
    margin-right: 1em;
  }

  > i {
    cursor: pointer;
  }
`;

interface GeneralSettingsProps {
  user: User;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ user }) => {
  const { urls } = useLogin();
  const { isEditName, edit, handleSaveName, nameInputValue, setNameInputValue } = useField(user);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.currentTarget.value);
  };

  return (
    <SegmentContainer title="全般">
      <Segment.Group>
        <Segment>
          <Header as="h4">名前</Header>
          {isEditName ? (
            <InlineContainer>
              <Input value={nameInputValue} onChange={handleChangeName} />
              <Button primary={true} onClick={handleSaveName}>
                保存
              </Button>
            </InlineContainer>
          ) : (
            <InlineContainer>
              <span>{user.name}</span>
              <Icon name="edit" onClick={edit} />
            </InlineContainer>
          )}
          <Header as="h4">アイコン</Header>
          <MarginedSegment>
            {urls.github && (
              <GithubButton fluid size="mini">
                GitHub アカウントのアイコンを使用
              </GithubButton>
            )}
            {urls.google && (
              <GoogleButton fluid size="mini">
                Google アカウントのアイコンを使用
              </GoogleButton>
            )}
          </MarginedSegment>
        </Segment>
      </Segment.Group>
    </SegmentContainer>
  );
};

export default GeneralSettings;
