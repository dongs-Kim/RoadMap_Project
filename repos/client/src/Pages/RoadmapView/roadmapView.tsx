/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { ROADMAP_CATEGORY } from '../../Constants/roadmap';
import { RoadmapItem, RoadmapSetDto } from '../../Interface/roadmap';
import { IReply, IUser } from '../../Interface/db';
import { toastError, toastSuccess } from '../../Utils/toast';
import { FlowView } from './FlowView';
import { RoadmapItemViewModal } from '../../Components/Modal/RoadmapItemViewModal';
import { downloadImage } from '../../Utils/roadmap';
import { RoadmapReply } from './RoadmapReply';
import { useViewer } from '../../Hooks/useViewer';

const RoadmapView = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [roadmapSet, setRoadmapSet] = useState<RoadmapSetDto | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadmapItem, setRoadmapItem] = useState<RoadmapItem | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLike, setIsLike] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const [replies, setReplies] = useState<IReply[]>([]);
  const [modalNodeType, setModalNodeType] = useState<string | undefined>();
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  const viewer = useViewer(viewerElRef, roadmapSet?.roadmap.contents);

  useEffect(() => {
    if (!roadmapId) {
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${roadmapId}`, { params: { mode: 'view' } });
        setRoadmapSet(data);
        viewer?.setMarkdown(data.roadmap.contents);
      } catch {
        toastError('로드맵을 불러오지 못했습니다');
        navigate(-1);
      }

      try {
        axios.get<IUser>('/api/users').then(({ data }) => setUser(data));
        axios.get<boolean>(`/api/roadmaps/${roadmapId}/isLike`).then(({ data }) => setIsLike(data));
        axios.get<boolean>(`/api/users/isStore/${roadmapId}`).then(({ data }) => setIsStore(data));
        loadReplies();
      } catch {
        // 로그인 안 한 상태
      }
    })();
  }, [navigate, roadmapId]);

  const category = useMemo(
    () => ROADMAP_CATEGORY.find((item) => item.id === roadmapSet?.roadmap.category)?.name,
    [roadmapSet],
  );

  const openModal = useCallback(
    (data: RoadmapItem, nodeType?: string) => {
      setRoadmapItem(data);
      setModalNodeType(nodeType);
      onOpen();
    },
    [onOpen],
  );

  const onCloseModal = useCallback(() => {
    onClose();
    setRoadmapItem(null);
  }, [onClose]);

  const onClickLike = useCallback(
    _.debounce(() => {
      if (!roadmapSet || !_.isNumber(roadmapSet.roadmap.like)) {
        return;
      }
      if (isLike) {
        axios.post(`/api/roadmaps/${roadmapId}/unlike`);
        setIsLike(false);
        setRoadmapSet({
          ...roadmapSet,
          roadmap: {
            ...roadmapSet.roadmap,
            like: roadmapSet.roadmap.like - 1,
          },
        });
      } else {
        axios.post(`/api/roadmaps/${roadmapId}/like`);
        setIsLike(true);
        setRoadmapSet({
          ...roadmapSet,
          roadmap: {
            ...roadmapSet.roadmap,
            like: roadmapSet.roadmap.like + 1,
          },
        });
      }
    }, 200),
    [roadmapSet, isLike, roadmapId],
  );

  const onClickStore = useCallback(
    _.debounce(() => {
      if (isStore) {
        axios.post(`/api/users/unstore-roadmap/`, { roadmap_id: roadmapId });
        setIsStore(false);
      } else {
        axios.post(`/api/users/store-roadmap/`, { roadmap_id: roadmapId });
        setIsStore(true);
      }
    }, 200),
    [isStore, roadmapId],
  );

  const onClickShareCopyURL = useCallback(
    _.debounce(() => {
      navigator.clipboard.writeText(window.location.href);
      toastSuccess('복사되었습니다');
    }, 200),
    [],
  );

  const onClickShareFacebook = useCallback(
    _.debounce(() => {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`);
    }, 200),
    [],
  );

  const onClickShareTwitter = useCallback(
    _.debounce(() => {
      if (roadmapSet) {
        window.open(
          `https://twitter.com/intent/tweet?text=${roadmapSet.roadmap.title}&url=${encodeURI(window.location.href)}`,
        );
      }
    }, 200),
    [],
  );

  const onClickDownloadImage = useCallback(
    _.debounce(async () => {
      const flowEl = document.querySelector<HTMLElement>('.react-flow');
      if (!flowEl) {
        return;
      }
      const result = await toPng(flowEl, {
        filter: (node) => {
          if (node?.classList?.contains('react-flow__minimap') || node?.classList?.contains('react-flow__controls')) {
            return false;
          }
          return true;
        },
      });
      downloadImage(result);
    }, 200),
    [],
  );

  const onClickClone = useCallback(
    _.debounce(async () => {
      if (!roadmapSet) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...restRoadmap } = roadmapSet.roadmap;
      const cloneRoadmapSet: RoadmapSetDto = {
        ...roadmapSet,
        roadmap: restRoadmap,
      };
      navigate('/Roadmap/write', {
        state: cloneRoadmapSet,
      });
    }, 200),
    [roadmapSet],
  );

  const onSaveReply = useCallback(
    _.debounce(async (contents: string) => {
      if (!contents) {
        toastError('댓글을 작성해 주세요');
        return;
      }

      try {
        await axios.post(`/api/replies`, { roadmap_id: roadmapId, contents });
        toastSuccess('댓글을 저장했습니다');
        loadReplies();
      } catch {
        toastError('댓글을 저장하지 못했습니다');
      }
    }, 200),
    [roadmapId],
  );

  const loadReplies = useCallback(() => {
    axios.get<IReply[]>(`/api/replies/${roadmapId}`).then(({ data }) => setReplies(data));
  }, [roadmapId]);

  if (!roadmapId) {
    toastError('잘못된 접근입니다');
    navigate(-1);
    return null;
  }
  if (!roadmapSet) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Heading as="h2" size="xl">
        로드맵 보기
      </Heading>
      <div>
        {user && (
          <>
            <Button colorScheme="teal" size="sm" variant={isLike ? 'solid' : 'outline'} onClick={onClickLike}>
              좋아요
            </Button>
            <Button colorScheme="teal" size="sm" variant={isStore ? 'solid' : 'outline'} onClick={onClickStore}>
              즐겨찾기
            </Button>
            <Button colorScheme="teal" size="sm" onClick={onClickClone}>
              내로드맵으로복사
            </Button>
          </>
        )}
        <Button colorScheme="teal" size="sm" onClick={onClickShareCopyURL}>
          공유(url복사)
        </Button>
        <Button colorScheme="teal" size="sm" onClick={onClickShareFacebook}>
          공유(페이스북)
        </Button>
        <Button colorScheme="teal" size="sm" onClick={onClickShareTwitter}>
          공유(트위터)
        </Button>
        <Button colorScheme="teal" size="sm" onClick={onClickDownloadImage}>
          이미지 다운
        </Button>
      </div>
      <div>
        <label>제목</label>
        <span>{roadmapSet.roadmap.title}</span>
      </div>
      <div>
        <label>카테고리</label>
        <span>{category}</span>
      </div>
      <div>
        <label>설명</label>
        <div ref={viewerElRef}></div>
      </div>
      <div>
        <label>좋아요</label>
        <span>{roadmapSet.roadmap.like}</span>
      </div>
      {roadmapSet.roadmap.thumbnail && (
        <div>
          <label>썸네일</label>
          <img src={roadmapSet.roadmap.thumbnail} alt="" width="100" />
        </div>
      )}

      <div>
        <label>로드맵</label>
        <FlowView nodes={roadmapSet.nodes} edges={roadmapSet.edges} openModal={openModal} />
      </div>

      <RoadmapReply replies={replies} user={user} onSave={onSaveReply} onDelete={loadReplies} onUpdate={loadReplies} />

      {isOpen && roadmapItem && (
        <RoadmapItemViewModal onClose={onCloseModal} data={roadmapItem} nodeType={modalNodeType} />
      )}
    </div>
  );
};

export default RoadmapView;
