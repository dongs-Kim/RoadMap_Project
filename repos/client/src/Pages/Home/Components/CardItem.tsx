import {
  Avatar,
  background,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { RoadmapCategoryDto } from '../../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';
import { Loading } from '../../../Components/Page/Loading';
import dayjs from 'dayjs';

interface Props {
  category: string | undefined;
}

export const CardItem = ({ category }: Props) => {
  const [roadmaps, setRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>(`/api/roadmaps/list/${category}`);
      setRoadmaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    loadRoadmaps();
  }, [loadRoadmaps]);

  return (
    <List display="flex" flexWrap="wrap">
      <Loading isOpen={loading} />
      {!loading &&
        roadmaps.map((roadmap) => (
          <ListItem display="flex" key={roadmap.id} margin="15px">
            <Card
              w="20rem"
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
              <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`} _hover={{ textDecoration: 'none' }}>
                <CardBody padding="0">
                  {/* 썸네일 */}
                  {roadmap.thumbnail && <Image src={roadmap.thumbnail} alt="" w="100%" h="167px" objectFit="cover" />}
                  {!roadmap.thumbnail && (
                    <Flex
                      w="100%"
                      h="167px"
                      alignItems="center"
                      justifyContent="center"
                      background="blackAlpha.500"
                      p={5}
                    >
                      <Text
                        color="#fff"
                        fontSize="2xl"
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

                  <Flex flexDir="column" p={4}>
                    {/* 제목 */}
                    <Heading fontSize="md" textOverflow="ellipsis" mb={1} whiteSpace="nowrap" overflow="hidden">
                      {roadmap.title}
                    </Heading>

                    {/* 내용 */}
                    <Text
                      h={roadmap.thumbnail ? '4rem' : 'calc(4rem + 167px)'}
                      mb="1.5rem"
                      fontSize="sm"
                      overflow="hidden"
                    >
                      {roadmap.contents ?? ''}
                    </Text>

                    {/* 작성시간, 댓글 */}
                    <Flex fontSize="xs" gap={1} color="gray.500">
                      <Text>{dayjs(roadmap.created_at).fromNow()}</Text>
                      <span>·</span>
                      <Text>댓글 2</Text>
                    </Flex>
                  </Flex>
                </CardBody>
              </Link>
              <Divider />

              {/* 푸터 */}
              <CardFooter justifyContent="space-between" padding="10px">
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
  );
};
