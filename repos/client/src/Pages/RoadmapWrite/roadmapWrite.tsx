import { ChangeEvent, useState, useCallback, useRef, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { RoadmapItemInputModal } from '../../Components/Modal/RoadmapItemInputModal';
import { RoadmapSetDto, RoadmapItem } from '../../Interface/roadmap';
import { Flow } from './Flow';
import { Node, useEdgesState, useNodesState } from 'reactflow';
import shortUUID from 'short-uuid';
import axios from 'axios';
import { toastError, toastSuccess } from '../../Utils/toast';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { ExportInterface, ImageType } from 'react-images-uploading/dist/typings';
import { useEditor } from '../../Hooks/useEditor';

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
  const location = useLocation();
  const [id, setId] = useState<string>(shortUUID.generate());
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('back_end');
  const [isPublic, setIsPublic] = useState(true);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadmapItem, setRoadmapItem] = useState<RoadmapItem | undefined>();
  const [modalNodeType, setModalNodeType] = useState<string | undefined>();
  const modalResolveRef = useRef<((value?: RoadmapItem) => void) | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(isEditing ? true : false);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditor(editorElRef, loading);

  useEffect(() => {
    // 복사한 경우
    if (location.state) {
      setStates(location.state);
      return;
    }
    // 수정인 경우
    if (!isEditing) {
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${roadmapId}`);
        setStates(data);
      } catch {
        toastError('로드맵을 불러오지 못했습니다');
        navigate(-1);
      }
    })();

    function setStates(data: RoadmapSetDto) {
      setId(data.roadmap.id ?? shortUUID.generate());
      setTitle(data.roadmap.title);
      setCategory(data.roadmap.category);
      setIsPublic(data.roadmap.public);
      setThumbnail(data.roadmap.thumbnail ?? null);
      setNodes(data.nodes);
      setEdges(data.edges);
      setLoading(false);
      editor?.setMarkdown(data.roadmap.contents);
    }
  }, [isEditing, navigate, roadmapId, setNodes, setEdges, location.state, editor]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const onChangeCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);
  const onChangeIsPublic = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  }, []);

  const openModal = useCallback(
    (data: RoadmapItem, nodeType?: string) => {
      return new Promise<RoadmapItem | void>((resolve) => {
        setRoadmapItem(data);
        setModalNodeType(nodeType);
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
      setRoadmapItem(undefined);
    },
    [onClose],
  );

  const onSave = useCallback(async () => {
    if (!editor) {
      return;
    }
    const saveDto: RoadmapSetDto = {
      roadmap: {
        id,
        title,
        category,
        public: isPublic,
        contents: editor.getMarkdown(),
        thumbnail,
      },
      nodes,
      edges,
      isUpdate: isEditing,
    };

    try {
      await axios.post('/api/roadmaps', saveDto);
      toastSuccess('로드맵을 저장했습니다');
      navigate('/mypage');
    } catch {
      toastError('저장하지 못했습니다');
    }
  }, [id, title, category, isPublic, nodes, edges, navigate, thumbnail, isEditing, editor]);

  const onChangeThumbnail = useCallback(
    async (imageList: ImageType[]) => {
      const file = imageList[0]?.file;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await axios.post<string>(`/api/roadmaps/${id}/thumbnail`, formData);
        setThumbnail(`${data}?t=${Date.now()}`);
      }
    },
    [id],
  );

  const onDeleteThumbnail = useCallback(() => {
    setThumbnail(null);
  }, []);

  const onClickSticker = useCallback(() => {
    setNodes([
      ...nodes,
      {
        id: shortUUID.generate(),
        type: 'stickerNode',
        data: { name: '', description: '스티커' },
        position: { x: 0, y: 0 },
      },
    ]);
  }, [setNodes, nodes]);

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
        <div ref={editorElRef}></div>
      </div>
      <div>
        <label>썸네일</label>
        <ImageUploading value={[]} onChange={onChangeThumbnail} dataURLKey="thumbnail">
          {({ onImageUpload, isDragging, dragProps }: ExportInterface) => (
            <div>
              <Button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                이미지 업로드
              </Button>
              {thumbnail && (
                <div>
                  <img src={thumbnail} alt="" width="100" />
                  <Button colorScheme="teal" size="sm" onClick={onDeleteThumbnail}>
                    삭제
                  </Button>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
      <div>
        <label>로드맵</label>
        <div>
          <Button onClick={onClickSticker}>스티커</Button>
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
      </div>
      <div style={{ display: isOpen ? 'block' : 'none' }} ref={modalContainerRef}>
        <RoadmapItemInputModal
          onClose={onCloseModal}
          data={roadmapItem}
          nodeType={modalNodeType}
          containerRef={modalContainerRef}
        />
      </div>
    </div>
  );
};

export default RoadmapWrite;
