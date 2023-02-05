import { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Heading,
  Link,
  useDisclosure,
  List,
  Card,
  CardBody,
  Image,
  Stack,
  CardFooter,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoadmapDto } from '../../Interface/roadmap';
import { toastError, toastSuccess } from '../../Utils/toast';
import { RoadmapDeleteDialog } from '../../Components/Dialog/RoadmapDeleteDialog';

const Mypage = () => {
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
      <Heading as="h2" size="xl" color="teal.400" pb="8">
        My page
      </Heading>
      <List display="flex">
        {loading && <div>...loading...</div>}
        {!loading &&
          myRoadmaps.map((roadmap) => (
            <List display="flex" key={roadmap.id} paddingLeft="7">
              <Card w="200px" alignContent="center">
                <Link as={RouterLink} to={`/Roadmap/view/${roadmap.id}`}>
                  {!roadmap.thumbnail && (
                    <CardBody>
                      <Image src="/img/NoImage.png" alt="" borderRadius="lg" h="140" />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{roadmap.title}</Heading>
                      </Stack>
                    </CardBody>
                  )}
                  {roadmap.thumbnail && (
                    <CardBody>
                      <Image src={roadmap.thumbnail} alt="" borderRadius="lg" h="140" />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{roadmap.title}</Heading>
                      </Stack>
                    </CardBody>
                  )}
                </Link>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button colorScheme="teal" size="xs" onClick={() => onClickModify(roadmap.id)}>
                      수정
                    </Button>
                    <Button colorScheme="teal" size="xs" onClick={() => onClickDelete(roadmap.id)}>
                      삭제
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </List>
          ))}
      </List>
      <RoadmapDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onRoadmapDelete} />
    </div>
  );
};

export default Mypage;
