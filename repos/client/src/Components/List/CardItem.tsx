import { useState, useCallback, useMemo } from 'react';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';
import { Loading } from '../../Components/Page/Loading';
import dayjs from 'dayjs';
import { BsPatchExclamation } from 'react-icons/bs';
import { ReactNode } from 'react';

const BG_COLOR_MAP: { [key: string]: string } = {
  '#ffffff': '#444',
  '#d9e3f0': '#444',
  '#9eabbf': '#eee',
  '#ffff00': '#444',
  '#ffe599': '#444',
  '#f47373': '#eee',
  '#37d67a': '#444',
  '#aee6ef': '#444',
  '#dce775': '#444',
  '#ff8a65': '#eee',
  '#dea7e7': '#444',
};

interface Props {
  loading?: boolean;
  roadmaps: RoadmapCategoryDto[];
  renderMore?(roadmap: RoadmapCategoryDto): ReactNode;
}

export const CardItem = ({ loading, roadmaps, renderMore }: Props) => {
  const [showEdit, setShowEdit] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const onMouseEnterItem = useCallback((id: string) => {
    if (id) {
      setShowEdit((prev) => ({ ...prev, [id]: true }));
    }
  }, []);

  const onMouseLeaveItem = useCallback((id: string) => {
    if (id) {
      setShowEdit((prev) => ({ ...prev, [id]: false }));
    }
  }, []);

  const onClickItem = useCallback(
    (id: string) => {
      if (id) {
        navigate(`/Roadmap/view/${id}`);
      }
    },
    [navigate],
  );

  return (
    <>
      <Loading isOpen={!!loading} />
      {!loading && roadmaps.length == 0 && (
        <Flex justifyContent="center" marginTop="40px" flexDir="column" alignItems="center" gap="3">
          <BsPatchExclamation size="30px"></BsPatchExclamation>
          등록된 로드맵이 없습니다
        </Flex>
      )}

      <List display="flex" flexWrap="wrap">
        {!loading &&
          roadmaps.map((roadmap) => (
            <ListItem
              display="flex"
              key={roadmap.id}
              margin="15px"
              onMouseEnter={renderMore ? () => onMouseEnterItem(roadmap.id ?? '') : undefined}
              onMouseLeave={renderMore ? () => onMouseLeaveItem(roadmap.id ?? '') : undefined}
            >
              <Card
                w="15rem"
                bg="#fff"
                borderColor="inherit"
                boxShadow="rgb(0 0 0 / 4%) 0px 4px 16px 0px"
                alignContent="center"
                backgroundColor="none"
                borderRadius="4px"
                overflow="hidden"
                transition="box-shadow 0.1s ease-in 0s, transform 0.1s ease-in 0s"
                _hover={{
                  background: 'gray.100',
                  color: 'black',
                  opacity: '1',
                  transform: 'translateY(-8px)',
                  boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 2px 0px',
                }}
              >
                <CardBody padding="0" cursor="pointer" onClick={() => onClickItem(roadmap.id ?? '')}>
                  {/* 추가 기능 */}
                  {renderMore && showEdit[roadmap.id ?? ''] && renderMore(roadmap)}

                  {/* 썸네일 */}
                  {roadmap.thumbnail && <Image src={roadmap.thumbnail} alt="" w="100%" h="130px" objectFit="cover" />}
                  {!roadmap.thumbnail && (
                    <Flex
                      w="100%"
                      h="130px"
                      alignItems="center"
                      justifyContent="center"
                      background={roadmap.bgcolor ?? 'blackAlpha.500'}
                      p={5}
                    >
                      <Text
                        color={BG_COLOR_MAP[roadmap.bgcolor ?? ''] ?? '#fff'}
                        fontSize="xl"
                        fontWeight="bold"
                        letterSpacing={1}
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        textShadow="2px 4px 8px rgba(0,0,0,0.3)"
                      >
                        {roadmap.title}
                      </Text>
                    </Flex>
                  )}

                  <Flex flexDir="column" p={3}>
                    {/* 제목 */}
                    <Heading fontSize="md" textOverflow="ellipsis" mb={2} whiteSpace="nowrap" overflow="hidden">
                      {roadmap.title}
                    </Heading>

                    {/* 내용 */}
                    <Text h="2.5rem" mb="1rem" fontSize="xs" overflow="hidden" whiteSpace="break-spaces">
                      {(roadmap.contents ?? '').replaceAll(/!\[[^\]]*\]\([^)]*\)/g, '')}
                    </Text>

                    {/* 작성시간, 댓글 */}
                    <Flex fontSize="xs" gap={1} color="gray.500">
                      <Text>{dayjs(roadmap.created_at).fromNow()}</Text>
                      <span>·</span>
                      <Text>댓글 {roadmap.reply}</Text>
                    </Flex>
                  </Flex>
                </CardBody>

                <Divider />

                {/* 푸터 */}
                <CardFooter justifyContent="space-between" p={2} pl={3} pr={3}>
                  <Flex alignItems="center">
                    <AiFillHeart className="icon" size="12" color="crimson" />
                    <Text ml="1" fontSize="xs">
                      {roadmap.like}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <RouterLink to={`/Roadmap/User/${roadmap.User.id}`}>
                      <Flex fontSize="xs" ml="2" gap={2} alignItems="center">
                        <Avatar size="xs" name={roadmap.User.nickname} src={roadmap.User.image} />
                        <Text fontWeight="bold">{roadmap.User.nickname}</Text>
                      </Flex>
                    </RouterLink>
                  </Flex>
                </CardFooter>
              </Card>
            </ListItem>
          ))}
      </List>
    </>
  );
};
