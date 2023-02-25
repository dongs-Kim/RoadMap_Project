import { Avatar, Flex, Heading, IconButton, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { CardItem } from '../../Components/List/CardItem';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useTitle } from '../../Hooks/useTitle';
import { RoadmapCategoryDto } from '../../Interface/roadmap';
import { toastError, toastSuccess } from '../../Utils/toast';
import { RoadmapDeleteDialog } from './components/RoadmapDeleteDialog';

const Mypage = () => {
  useTitle('내 로드맵 - Dev Roadmap');
  const { userData: user } = useUser();
  const [myRoadmaps, setMyRoadmaps] = useState<RoadmapCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('recently');
  const [toDeleteId, setToDeleteId] = useState<string>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadMyRoadmaps = useCallback(async () => {
    try {
      const { data } = await axios.get<RoadmapCategoryDto[]>('/api/roadmaps/list/my');
      if (data && sort == 'like') {
        data.sort((a, b) => {
          if (a.like > b.like) {
            return -1;
          }
          if (a.like < b.like) {
            return 1;
          }
          return 0;
        });
      }
      setMyRoadmaps(data);
    } catch {
      toastError('내 로드맵을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    loadMyRoadmaps();
  }, [loadMyRoadmaps]);

  const onClickSort = useCallback((id: string) => {
    setSort(id);
  }, []);

  const onClickDelete = useCallback(
    (roadmapId?: string) => {
      if (roadmapId) {
        setToDeleteId(roadmapId);
        onOpen();
      }
    },
    [onOpen],
  );

  const onClickModify = useCallback(
    (roadmapId?: string) => {
      if (roadmapId) {
        navigate(`/Roadmap/write/${roadmapId}`);
      }
    },
    [navigate],
  );

  const onRoadmapDelete = useCallback(async () => {
    if (toDeleteId) {
      await axios.delete(`/api/roadmaps/${toDeleteId}`);
      onClose();
      toastSuccess('삭제했습니다');
      setToDeleteId(undefined);
      loadMyRoadmaps();
    }
  }, [onClose, toDeleteId, loadMyRoadmaps]);

  const getEditToolbar = useCallback(
    (roadmap: RoadmapCategoryDto) => {
      return (
        <Flex position="absolute" top={3} right={3} zIndex={5} gap={2}>
          <Tooltip label="수정">
            <IconButton
              aria-label="edit"
              icon={<FiEdit2 />}
              size="sm"
              colorScheme="blackAlpha"
              onClick={(e) => {
                e.stopPropagation();
                onClickModify(roadmap.id);
              }}
            />
          </Tooltip>
          <Tooltip label="삭제">
            <IconButton
              aria-label="delete"
              icon={<AiOutlineDelete size={17} />}
              size="sm"
              colorScheme="blackAlpha"
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete(roadmap.id);
              }}
            />
          </Tooltip>
        </Flex>
      );
    },
    [onClickModify, onClickDelete],
  );

  return (
    <>
      <RoadmapSortList
        title={
          <>
            {user && (
              <Flex alignItems="center" gap={5} height="140px">
                <Avatar size="xl" name={user.nickname} src={user.image} />
                <Flex flexDir="column" gap={3}>
                  <Text fontWeight="bold" fontSize="xl">
                    {user.nickname}
                  </Text>
                  <Text fontSize="md">{user.comment}</Text>
                </Flex>
              </Flex>
            )}
          </>
        }
        sort={sort}
        onClickSort={onClickSort}
      >
        <CardItem loading={loading} roadmaps={myRoadmaps} renderMore={getEditToolbar}></CardItem>
      </RoadmapSortList>

      <RoadmapDeleteDialog isOpen={isOpen} onClose={onClose} onDelete={onRoadmapDelete} />
    </>
  );
};

export default Mypage;
