import {
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
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { RoadmapDto, RoadmapLikeDto } from '../../../Interface/roadmap';
import { AiFillHeart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  category: string | undefined;
}

export const CardItem = ({ category }: Props) => {
  const [roadmaps, setRoadmaps] = useState<RoadmapLikeDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapLikeDto[]>(`/api/roadmaps/list/${category}`);
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
    <List display="flex" width= "100%">
      {loading && <Text>Loading....</Text>}
      {!loading &&
        roadmaps.map((roadmap) => (
          <List display="flex" key={roadmap.id} paddingLeft="5" overflow= "auto">
            <Card
              w="200px"
              alignContent="center"
              _hover={{
                background: 'gray.100',
                color: 'black',
                transition: 'opacity 0.35s ease-in-out',
                opacity: '1',
              }}
            >
              <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                {!roadmap.thumbnail && (
                  <CardBody >
                    <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{roadmap.title}</Heading>
                    </Stack>
                  </CardBody>
                )}
                {roadmap.thumbnail && (
                  <CardBody >
                    <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{roadmap.title}</Heading>
                    </Stack>
                  </CardBody>
                )}
              </Link>
              <Divider borderColor="#ccc" />
              <Flex flexDir="column" w="100%" maxW="1000px" alignItems="flex-end">
                <Flex>
                  <CardFooter w="100%" maxW="1000px">
                    <Flex alignItems="center">
                      <AiFillHeart className="icon" size="8" color="red" />
                      <Text ml="1" fontSize="xs">
                        {roadmap.LikeUsers.length}
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Text fontSize="3" ml="2">
                        by. {roadmap.User.nickname}
                      </Text>
                    </Flex>
                  </CardFooter>
                </Flex>
              </Flex>
            </Card>
          </List>
        ))}
    </List>
  );
};
