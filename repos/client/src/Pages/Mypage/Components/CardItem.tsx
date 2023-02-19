import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toastError, toastSuccess } from '../../../Utils/toast';
import { RoadmapDto } from '../../../Interface/roadmap';
import { RoadmapDeleteDialog } from '../../../Components/Dialog/RoadmapDeleteDialog';
import { Loading } from '../../../Components/Page/Loading';

export const CardItem = () => {
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapDto[]>('/api/roadmaps/list/my');
      setMyRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  const onClickDelete = useCallback(
    (roadmapId?: string) => {
      if (roadmapId) {
        setToDeleteId(roadmapId);
        onOpen();
      }
    },
    [onOpen],
  );
  const onClickModify = useCallback((roadmapId?: string) => {
    if (roadmapId) {
      navigate(`/Roadmap/write/${roadmapId}`);
    }
  }, []);

  const onRoadmapDelete = useCallback(async () => {
    if (toDeleteId) {
      await axios.delete(`/api/roadmaps/${toDeleteId}`);
      onClose();
      toastSuccess('삭제했습니다');
      setToDeleteId(null);
      loadMyRoadmaps();
    }
  }, [onClose, toDeleteId, loadMyRoadmaps]);

  return (
    <div>
      <List display="flex" flexWrap="wrap">
        <Loading isOpen={loading} />
        {myRoadmaps.map((roadmap) => (
          <ListItem display="flex" key={roadmap.id} margin="10px">
            <Card
              w="200px"
              boxShadow="none"
              alignContent="center"
              backgroundColor="none"
              border="1px solid #ccc"
              borderRadius="lg"
              padding="10px"
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
                {!roadmap.thumbnail && (
                  <CardBody borderBottom="1px solid #ccc" padding="0">
                    <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" margin="0 auto" />
                    <Stack mt="6" spacing="3">
                      <h3
                        style={{
                          display: '-webkit-box',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          verticalAlign: 'top',
                          wordBreak: 'break-all',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          height: '56px',
                        }}
                      >
                        {roadmap.title}
                      </h3>
                    </Stack>
                  </CardBody>
                )}
                {roadmap.thumbnail && (
                  <CardBody borderBottom="1px solid #ccc" padding="0">
                    <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" margin="0 auto" />
                    <Stack mt="6" spacing="3">
                      <h3
                        style={{
                          display: '-webkit-box',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          verticalAlign: 'top',
                          wordBreak: 'break-all',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          height: '56px',
                        }}
                      >
                        {roadmap.title}
                      </h3>
                    </Stack>
                  </CardBody>
                )}
              </Link>
              <CardFooter padding="10px">
                <ButtonGroup spacing="2">
                  <Button colorScheme="blue" size="xs" onClick={() => onClickModify(roadmap.id)}>
                    수정
                  </Button>
                  <Button size="xs" onClick={() => onClickDelete(roadmap.id)}>
                    삭제
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </ListItem>
        ))}
      </List>
      <RoadmapDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onRoadmapDelete} />
    </div>
  );
};
