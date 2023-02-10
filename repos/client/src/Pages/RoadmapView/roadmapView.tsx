import { Avatar, Badge, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { BiLike, BiBookmark, BiShareAlt } from 'react-icons/bi';
import { BsBookmarkFill, BsFillBookmarkFill } from 'react-icons/bs';
import { HiBookmark } from 'react-icons/hi';
import { AiFillLike } from 'react-icons/ai';

const RoadmapView = () => {
  return (
    <Flex width="100%" justifyContent="center">
      <Flex flexDir="column" width={{ base: '100%', md: '1000px' }} minH="500px" pt={10}>
        {/* 카테고리 */}
        <Flex pb={3}>
          <Link>
            <Badge colorScheme="green">프론트엔드</Badge>
          </Link>
        </Flex>

        {/* 제목 */}
        <Flex pb={5}>
          <Heading size="xl">리액트 개발자 로드맵</Heading>
        </Flex>

        <Flex pb={5} justifyContent="space-between">
          {/* 작성자 */}
          <Flex alignItems="center" gap={1} fontSize="sm">
            <Link mr={1}>
              <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </Link>
            <Link>
              <Text>흑염의개발자</Text>
            </Link>
            <span>·</span>
            <Text>9일전</Text>
            <span>·</span>
          </Flex>
          <Flex alignItems="center" gap={3} fontSize="2xl">
            <Link>
              <AiFillLike fill="none" strokeWidth="80" className="roadmap-bookmark" />
            </Link>
            <Link>
              <HiBookmark fill="none" strokeWidth="1.5" className="roadmap-bookmark" />
            </Link>
            <Link _hover={{ color: '#ff5722' }}>
              <BiShareAlt />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RoadmapView;
