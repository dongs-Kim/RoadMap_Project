import { Button, Heading, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { IReply } from '../../Interface/db';

interface RoadmapReplyProps {
  replies: IReply[];
  onSave?(reply: string): void;
}

export const RoadmapReply = ({ replies, onSave }: RoadmapReplyProps) => {
  const [contents, setContents] = useState('');

  const onChangeReply = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onClickSaveReply = useCallback(() => {
    onSave?.(contents);
    setContents('');
  }, [onSave, contents]);

  return (
    <div>
      <Heading size="md">댓글</Heading>
      <div>
        <Textarea value={contents} onChange={onChangeReply} />
        <Button colorScheme="teal" size="sm" onClick={onClickSaveReply}>
          댓글 작성
        </Button>
      </div>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <div>
              <span>{reply.user_nickname}</span>
              <span>{new Date(reply.created_at).toLocaleDateString()}</span>
            </div>
            <div>{reply.contents}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
