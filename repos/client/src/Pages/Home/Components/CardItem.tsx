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
    // <Flex whiteSpace= "nowrap" w = "80%" overflowX="auto" scrollBehavior="smooth" sx = {{
    //   '&::-webkit-scrollbar': {
    //     display : 'none'
    //   },
    // }}>
    <Flex whiteSpace="nowrap" overflowX="auto" w="1800px">
      <List display="flex">
        {loading && <div>Loading....</div>}
        {!loading &&
          roadmaps.map((roadmap) => (
            <List display="flex" key={roadmap.id} paddingLeft="5">
              <Card w="200px" alignContent="center">
                <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                  {!roadmap.thumbnail && (
                    <Tooltip label={roadmap.contents}>
                      <CardBody
                        position="relative"
                        _hover={{
                          background: 'teal.300',
                          color: 'white',
                          transition: 'opacity 0.35s ease-in-out',
                          opacity: '1',
                        }}
                      >
                        <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" />
                        
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{roadmap.title}</Heading>
                        </Stack>
                      </CardBody>
                    </Tooltip>
                  )}
                  {roadmap.thumbnail && (
                    <Tooltip label={roadmap.contents}>
                      <CardBody
                        position="relative"
                        _hover={{
                          background: 'teal.300',
                          color: 'white',
                          transition: 'opacity 0.35s ease-in-out',
                          opacity: '1',
                        }}
                      >
                        <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" />
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{roadmap.title}</Heading>
                        </Stack>
                      </CardBody>
                    </Tooltip>
                  )}
                </Link>
                <Divider />
                <CardFooter alignContent="right">
                  <AiFillHeart className="icon" size="15" color="red" />
                  <Text pl="1" fontSize="small">
                    {roadmap.LikeUsers.length}{' '}
                  </Text>
                </CardFooter>
              </Card>
            </List>
          ))}
      </List>
    </Flex>
  );
};
