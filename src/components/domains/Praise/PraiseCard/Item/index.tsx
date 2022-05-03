import { Avatar, Box, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaEdit, FaTrashAlt, FaArrowRight } from 'react-icons/fa';

import Reaction from '~/components/domains/Praise/Reaction';
import EmojiPicker from '~/components/ui/EmojiPicker';
import { parseMessage, Praise, Stamp } from '~/domains/praise';
import { getThemeColor } from '~/layouts/theme';

import DeletePraise from '../../DeletePraise';
import PraiseEditor from '../../PraiseEditor';

interface PraiseCard extends Omit<Praise, 'createdAt' | 'updatedAt'> {
  upVoted: boolean;
  liked: boolean;
  stamps: Array<Stamp & { stamped: boolean }>;
  isMine: boolean;
  isEdit: boolean;
  isSend: boolean;
  isReceived: boolean;
  createdAt: string;
  updatedAt: string;
  onClickUpVote: () => void;
  onClickLike: () => void;
  onClickStamp: (name: string) => void;
  onUpdate: (praise: Praise) => void;
  onDelete: () => void;
}

interface PraiseCardProps {
  praise: PraiseCard;
}

const PraiseCard: FC<PraiseCardProps> = ({ praise }) => {
  const parsedMessage = parseMessage(praise.message).parsed;
  const createClickStampHandler = (name: string) => () => praise.onClickStamp(name);

  return (
    <Box position="relative" borderWidth="1px" borderRadius="lg" bg={getThemeColor('background')}>
      {praise.isSend && (
        <Flex lineHeight={1} position="absolute" right={4} top={4} gap={4}>
          <PraiseEditor praise={praise}>
            <Box cursor="pointer">
              <FaEdit size={14} />
            </Box>
          </PraiseEditor>
          <DeletePraise praiseId={praise.id} onDelete={praise.onDelete}>
            <Box cursor="pointer">
              <FaTrashAlt size={14} />
            </Box>
          </DeletePraise>
        </Flex>
      )}

      <Flex padding="4" direction="column" gap={2}>
        <Flex fontWeight="bold" lineHeight={1} direction="row" alignItems="center" gap={4}>
          <Flex alignItems="center">
            <Avatar mr={2} size="sm" src={praise.from.icon} />
            {praise.from.name}
          </Flex>
          <Flex alignItems="center">
            <FaArrowRight size={16} />
          </Flex>
          <Flex alignItems="center">
            <Avatar mr={2} size="sm" src={praise.to.icon} />
            {praise.to.name}
          </Flex>
        </Flex>

        <Box color="gray.400" fontWeight="semibold" letterSpacing="wide" fontSize="sm" ml={1}>
          {`${praise.createdAt}${praise.isEdit ? '（編集済み）' : ''}`}
        </Box>

        <Box>
          {parsedMessage.map((word, index) =>
            word.type === 'tag' ? <a key={index}>{` ${word.text}`}</a> : ` ${word.text}`,
          )}
        </Box>

        <Flex display="flex" mt="2" alignItems="center" gap={4}>
          <Reaction title="賛同" users={praise.upVotes}>
            <Reaction.UpVote
              count={praise.upVotes.length}
              active={praise.upVoted}
              onClick={praise.isMine ? undefined : praise.onClickUpVote}
            />
          </Reaction>
          <Reaction title="いいね" users={praise.likes}>
            <Reaction.Like count={praise.likes.length} active={praise.liked} onClick={praise.onClickLike} />
          </Reaction>
          {praise.stamps.map((stamp) => (
            <Reaction key={stamp.stampId} title={`:${stamp.stampId}:`} users={stamp.users}>
              <Reaction.Stamp
                count={stamp.users.length}
                stampId={stamp.stampId}
                active={stamp.stamped}
                onClick={createClickStampHandler(stamp.stampId)}
              />
            </Reaction>
          ))}
          <EmojiPicker onClick={praise.onClickStamp} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default PraiseCard;
