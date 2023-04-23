import { useRef, useEffect, useCallback, useReducer, ChangeEvent, MouseEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Editor from '@toast-ui/editor';
import _ from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { ColorResult } from 'react-color';
import { RoadmapItem } from '../../../Interface/roadmap';
import { ColorPicker } from './ColorPicker';
import {
  RoadmapItemRequired,
  RoadmapItemStatus,
  ROADMAP_ITEM_REQUIRED,
  ROADMAP_ITEM_STATUS,
} from '../../../Constants/roadmapItem';
import { ItemAutocomplete } from './ItemAutocomplete';
import { RoadmapLearnResourceDto } from '../../../Interface/learnResource';
import { LearnResourceListContainer } from '../../LearnResourceListContainer/LearnResourceListContainer';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { toastError } from '../../../Utils/toast';
import { saveTempImageAsync } from '../../../Apis/roadmapApi';

//---------------------
// state
//---------------------
type State = RoadmapItem;
const initialState: State = {
  name: '',
  description: '',
  bgcolor: '#ffffff',
  border: true,
  status: '',
  required: '',
  learnResources: [],
};
type SetRoadmapItemAction = { type: 'setRoadmapItem'; roadmapItem: RoadmapItem };
type ClearRoadmapItemAction = { type: 'clearRoadmapItem' };
type SetNameAction = { type: 'setName'; name: string };
type SetCategoryAction = { type: 'setCategory'; category: string };
type SetBgColorAction = { type: 'setBgColor'; bgcolor: string };
type SetDescriptionAction = { type: 'setDescription'; description: string };
type SetStatusAction = { type: 'setStatus'; status?: RoadmapItemStatus };
type SetBorderAction = { type: 'setBorder'; border: boolean };
type SetRequiredAction = { type: 'setRequired'; required?: RoadmapItemRequired };
type AddLearnResourceAction = { type: 'addLearnResource'; learnResource: RoadmapLearnResourceDto };
type RemoveLearnResourceAction = { type: 'removeLearnResource'; learnResource: RoadmapLearnResourceDto };
type AddTempImageAction = { type: 'addTempImage'; tempImage: string };
type Action =
  | SetBgColorAction
  | SetRoadmapItemAction
  | SetNameAction
  | SetCategoryAction
  | SetDescriptionAction
  | SetStatusAction
  | SetBorderAction
  | ClearRoadmapItemAction
  | SetRequiredAction
  | AddLearnResourceAction
  | RemoveLearnResourceAction
  | AddTempImageAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setCategory':
      return { ...state, category: action.category };
    case 'setDescription':
      return { ...state, description: action.description };
    case 'setBgColor':
      return { ...state, bgcolor: action.bgcolor };
    case 'setStatus':
      return { ...state, status: action.status };
    case 'setBorder':
      return { ...state, border: action.border };
    case 'setRequired':
      return { ...state, required: action.required };
    case 'setRoadmapItem':
      return { ...action.roadmapItem };
    case 'clearRoadmapItem':
      return initialState;
    case 'addLearnResource':
      return { ...state, learnResources: _.unionBy([...(state.learnResources ?? []), action.learnResource], 'id') };
    case 'removeLearnResource':
      return {
        ...state,
        learnResources: state.learnResources?.filter((learnResource) => learnResource.id !== action.learnResource.id),
      };
    case 'addTempImage':
      return { ...state, temp_images: [...(state.temp_images ?? []), action.tempImage] };
    default:
      throw new Error();
  }
}

//---------------------
// component
//---------------------
interface RoadmapItemModalProps {
  isOpen: boolean;
  onClose(data?: RoadmapItem): void;
  roadmapItem?: RoadmapItem;
}

export const RoadmapItemModal = ({ isOpen, onClose, roadmapItem }: RoadmapItemModalProps) => {
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const modalContentRef = useRef<HTMLElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen: isOpenResource, onOpen: onOpenResource, onClose: onCloseResource } = useDisclosure();

  const createEditor = useCallback((value?: string) => {
    if (editorElRef.current) {
      const editor = new Editor({
        el: editorElRef.current,
        initialValue: ' ',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        placeholder: '설명을 입력하세요',
        hooks: {
          async addImageBlobHook(blob, callback) {
            if (!blob.type.startsWith('image/')) {
              toastError('이미지를 업로드해 주세요');
              return;
            }

            if (blob instanceof File) {
              const tempImage = await saveTempImageAsync(blob);
              callback(tempImage);
              dispatch({ type: 'addTempImage', tempImage });
            }
          },
        },
      });

      // 에디터를 ref에 설정
      editorRef.current = editor;

      // 에디터 오류로 인해 초기값을 공백으로 설정해서 잘못된 값을 지운 후 다시 빈 문자열로 설정한다
      setTimeout(() => {
        editor.setMarkdown(value || '');
      });
    }
  }, []);

  // 에디터 생성
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      createEditor(roadmapItem?.description);
    });
  }, [createEditor, isOpen, roadmapItem]);

  // 데이터 설정
  useEffect(() => {
    if (roadmapItem) {
      dispatch({ type: 'setRoadmapItem', roadmapItem });
    }
  }, [roadmapItem]);

  const onChangeBgColor = useCallback((color: ColorResult) => {
    dispatch({ type: 'setBgColor', bgcolor: color.hex });
  }, []);

  const onChangeStatus = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setStatus', status: e.target.value as RoadmapItemStatus });
  }, []);

  const onChangeRequired = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setRequired', required: e.target.value as RoadmapItemRequired });
  }, []);

  const onChangeBorder = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setBorder', border: e.target.checked });
  }, []);

  const onClickApply = useCallback(() => {
    if (editorRef.current) {
      onClose({
        ...state,
        description: editorRef.current.getMarkdown(),
      });
      onCloseResource();
      dispatch({ type: 'clearRoadmapItem' });
    }
  }, [onClose, onCloseResource, state]);

  const onCloseModal = useCallback(() => {
    onClose();
    onCloseResource();
    dispatch({ type: 'clearRoadmapItem' });
  }, [onClose, onCloseResource]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setName', name: e.target.value });
  }, []);

  const onClickResource = useCallback(() => {
    onOpenResource();
  }, [onOpenResource]);

  const onApplyLearnResources = useCallback((learnResources: RoadmapLearnResourceDto[]) => {
    learnResources.forEach((learnResource) => {
      dispatch({ type: 'addLearnResource', learnResource });
    });
  }, []);

  const onRemoveLearnResource = useCallback((learnResource: RoadmapLearnResourceDto) => {
    dispatch({ type: 'removeLearnResource', learnResource });
  }, []);

  const onClickModalContent = useCallback(
    (e: MouseEvent) => {
      //에디터 툴바를 닫기 위해 에디터를 새로 생성한다
      const editorToolbarEl = modalContentRef.current?.querySelector<HTMLElement>('.toastui-editor-dropdown-toolbar');
      if (
        e.target instanceof HTMLElement &&
        !e.target.classList.contains('more') &&
        !e.target.closest('.toastui-editor-dropdown-toolbar') &&
        !e.target.closest('.toastui-editor-popup') &&
        editorToolbarEl?.style.display !== 'none'
      ) {
        if (editorRef.current) {
          const description = editorRef.current.getMarkdown();
          editorRef.current.destroy();
          createEditor(description);
        }
      }
    },
    [createEditor],
  );

  const onChangeCategory = useCallback((category: string) => {
    dispatch({ type: 'setCategory', category });
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent ref={modalContentRef} onClick={onClickModalContent}>
          <ModalHeader>항목 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 항목명 */}
            <FormControl zIndex={1000} mb={5}>
              <ItemAutocomplete
                placeholder="카테고리를 입력하세요"
                value={state.category ?? ''}
                onChange={onChangeCategory}
              />
            </FormControl>

            {/* 제목 */}
            <InputGroup mb={5}>
              <InputLeftAddon>
                <Text fontSize="sm">항목명</Text>
              </InputLeftAddon>
              <Input placeholder="항목명을 입력하세요" bg="#fff" value={state.name} onChange={onChangeName} />
            </InputGroup>

            <Flex mb={5} alignItems="center" justifyContent="space-between">
              {/* 배경색 */}
              <Box flex={1} mr={2}>
                <ColorPicker color={state.bgcolor} onChange={onChangeBgColor} />
              </Box>

              {/* 테두리 */}
              <FormControl display="flex" alignItems="center" width={90} justifyContent="flex-end">
                <FormLabel mb="0" color="#666" fontWeight="thin" fontSize="sm">
                  테두리
                </FormLabel>
                <Switch colorScheme="teal" isChecked={state.border} onChange={onChangeBorder} />
              </FormControl>
            </Flex>

            <Flex gap={3}>
              {/* 진행상태 */}
              <InputGroup mb={5}>
                <InputLeftAddon>
                  <Text fontSize="sm">진행상태</Text>
                </InputLeftAddon>
                <Select placeholder="----" value={state.status ?? ''} onChange={onChangeStatus}>
                  {Object.entries(ROADMAP_ITEM_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </InputGroup>

              {/* 필수여부 */}
              <InputGroup mb={5}>
                <InputLeftAddon>
                  <Text fontSize="sm">필수여부</Text>
                </InputLeftAddon>
                <Select placeholder="----" value={state.required ?? ''} onChange={onChangeRequired}>
                  {Object.entries(ROADMAP_ITEM_REQUIRED).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Flex>

            {/* 에디터 */}
            <div ref={editorElRef} style={{ minHeight: '350px', marginBottom: '1.25rem' }}></div>

            {/* 추천 학습 리소스 */}
            <Flex flexDir="column">
              <Flex mb={1}>
                <Heading fontSize="lg" mr={3}>
                  추천 학습 리소스
                </Heading>
                <Link color="teal" onClick={onClickResource}>
                  추가
                </Link>
              </Flex>
              <Flex flexDir="column">
                {state.learnResources?.map((learnResource) => (
                  <Flex key={learnResource.id} alignItems="center">
                    <Box maxW="500px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                      <Link as={RouterLink} color="teal" to={`/LearnResource/view/${learnResource.id}`} target="_blank">
                        {learnResource.name}
                      </Link>
                    </Box>
                    <SmallCloseIcon
                      color="gray.500"
                      ml={3}
                      cursor="pointer"
                      onClick={() => onRemoveLearnResource(learnResource)}
                    />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClickApply}>
              적용
            </Button>
            <Button variant="ghost" onClick={onCloseModal}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 추천 학습 리소스 modal */}
      <Modal isOpen={isOpenResource} size="5xl" onClose={onCloseResource}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LearnResourceListContainer isModal onClose={onCloseResource} onApply={onApplyLearnResources} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
