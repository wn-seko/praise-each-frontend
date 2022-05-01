import React, { FC } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { GithubButton, GoogleButton } from '~/components/ui/Button';
import { User } from '~/domains/user';
import { useField, useOAuthUpdateIconLinks } from './hooks';
import Segment from '~/components/ui/Segment';

interface GeneralSettingsProps {
  user: User;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ user }) => {
  const { updateIconUrls } = useOAuthUpdateIconLinks();
  const { isEditName, edit, handleSaveName, nameInputValue, setNameInputValue } = useField(user);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(e.currentTarget.value);
  };

  return (
    <Segment title="全般">
      <Segment.Item title="名前">
        {isEditName ? (
          <Flex direction="row" gap={4}>
            <Input value={nameInputValue} onChange={handleChangeName} />
            <Button colorScheme="green" onClick={handleSaveName}>
              保存
            </Button>
          </Flex>
        ) : (
          <Flex alignItems="center" lineHeight={1} direction="row" gap={4}>
            <span>{user.name}</span>
            <FaEdit cursor="pointer" onClick={edit} />
          </Flex>
        )}
      </Segment.Item>
      <Segment.Item title="アイコン">
        {updateIconUrls.github && (
          <GithubButton width={320} as="a" size="md" href={updateIconUrls.github}>
            GitHub アカウントのアイコンを使用する
          </GithubButton>
        )}
        {updateIconUrls.google && (
          <GoogleButton width={320} as="a" size="md" href={updateIconUrls.google}>
            Google アカウントのアイコンを使用する
          </GoogleButton>
        )}
      </Segment.Item>
    </Segment>
  );
};

export default GeneralSettings;
