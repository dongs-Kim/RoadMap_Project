import { ChangeEvent, useState, useCallback, useRef, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { RoadmapItemInputModal } from '../../Components/Modal/RoadmapItemInputModal';
import { RoadmapSetDto, RoadmapItem } from '../../Interface/roadmap';
import { Flow } from './Flow';
import { Node, useEdgesState, useNodesState } from 'reactflow';
import shortUUID from 'short-uuid';
import axios from 'axios';
import { toastError, toastSuccess } from '../../Utils/toast';
import { useParams, useNavigate } from 'react-router-dom';

const initialNodes: Node<RoadmapItem>[] = [
  {
    id: shortUUID.generate(),
    type: 'startNode',
    data: { name: '시작', description: '' },
    position: { x: 100, y: 50 },
  },
];

const RoadmapWrite = () => {
  const { roadmapId } = useParams();
  const isEditing = roadmapId ? true : false;
  const navigate = useNavigate();
  const [id, setId] = useState<string | undefined>();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('back_end');
  const [isPublic, setIsPublic] = useState(true);
  const [contents, setContents] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadmapItem, setRoadmapItem] = useState<RoadmapItem | null>(null);
  const modalResolveRef = useRef<((value?: RoadmapItem) => void) | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(isEditing ? true : false);

  useEffect(() => {
    // 수정인 경우
    if (!isEditing) {
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${roadmapId}`);
        setId(data.roadmap.id);
        setTitle(data.roadmap.title);
        setCategory(data.roadmap.category);
        setIsPublic(data.roadmap.public);
        setContents(data.roadmap.contents);
        setNodes(data.nodes);
        setEdges(data.edges);
        setLoading(false);
      } catch {
        toastError('로드맵을 불러오지 못했습니다');
        navigate(-1);
      }
    })();
  }, [isEditing, navigate, roadmapId, setNodes, setEdges]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const onChangeCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);
  const onChangeIsPublic = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  }, []);
  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const openModal = useCallback(
    (data: RoadmapItem) => {
      return new Promise<RoadmapItem | void>((resolve) => {
        setRoadmapItem(data);
        onOpen();
        modalResolveRef.current = resolve;
      });
    },
    [onOpen],
  );

  const onCloseModal = useCallback(
    (data?: RoadmapItem) => {
      onClose();
      if (modalResolveRef.current) {
        modalResolveRef.current(data);
      }

      modalResolveRef.current = null;
      setRoadmapItem(null);
    },
    [onClose],
  );

  const onSave = useCallback(async () => {
    const saveDto: RoadmapSetDto = {
      roadmap: {
        id,
        title,
        category,
        public: isPublic,
        contents,
      },
      nodes,
      edges,
    };
    try {
      await axios.post('/api/roadmaps', saveDto);
      toastSuccess('로드맵을 저장했습니다');
    } catch {
      toastError('저장하지 못했습니다');
    }
  }, [id, title, category, isPublic, contents, nodes, edges]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>로드맵 작성</h1>
      <Button colorScheme="teal" onClick={onSave}>
        저장
      </Button>
      <div>
        <label>제목</label>
        <input type="text" value={title} onChange={onChangeTitle}></input>
      </div>
      <div>
        <label>카테고리</label>
        <select value={category} onChange={onChangeCategory}>
          <option value="front_end">프론트엔드</option>
          <option value="back_end">백엔드</option>
        </select>
      </div>
      <div>
        <label>공개여부</label>
        <input type="checkbox" checked={isPublic} onChange={onChangeIsPublic}></input>
      </div>
      <div>
        <label>설명</label>
        <textarea value={contents} onChange={onChangeContents} />
      </div>
      <div>
        <label>로드맵</label>
        <Flow
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
          edges={edges}
          setEdges={setEdges}
          onEdgesChange={onEdgesChange}
          openModal={openModal}
        />
      </div>
      {isOpen && roadmapItem && <RoadmapItemInputModal onClose={onCloseModal} data={roadmapItem} />}
    </div>
  );
};

export default RoadmapWrite;
