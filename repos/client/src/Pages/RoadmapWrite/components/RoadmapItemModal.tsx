import { useRef, useEffect, useCallback, useReducer, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
} from '@chakra-ui/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Editor from '@toast-ui/editor';
import { ColorResult } from 'react-color';
import { RoadmapItem } from '../../../Interface/roadmap';
import { ColorPicker } from './ColorPicker';
import { ROADMAP_ITEM_NAME_LIST } from '../../../Constants/roadmap';
import { RoadmapItemStatus, ROADMAP_ITEM_STATUS } from '../../../Constants/roadmapItemStatus';

const autocompleteItems = ROADMAP_ITEM_NAME_LIST.map(({ name }, i) => ({ id: i, name }));

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
};
type SetRoadmapItemAction = { type: 'setRoadmapItem'; roadmapItem: RoadmapItem };
type ClearRoadmapItemAction = { type: 'clearRoadmapItem' };
type SetNameAction = { type: 'setName'; name: string };
type SetBgColorAction = { type: 'setBgColor'; bgcolor: string };
type SetDescriptionAction = { type: 'setDescription'; description: string };
type SetStatusAction = { type: 'setStatus'; status?: RoadmapItemStatus };
type SetBorderAction = { type: 'setBorder'; border: boolean };
type Action =
  | SetBgColorAction
  | SetRoadmapItemAction
  | SetNameAction
  | SetDescriptionAction
  | SetStatusAction
  | SetBorderAction
  | ClearRoadmapItemAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setDescription':
      return { ...state, description: action.description };
    case 'setBgColor':
      return { ...state, bgcolor: action.bgcolor };
    case 'setStatus':
      return { ...state, status: action.status };
    case 'setBorder':
      return { ...state, border: action.border };
    case 'setRoadmapItem':
      return { ...action.roadmapItem };
    case 'clearRoadmapItem':
      return initialState;
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
  const [state, dispatch] = useReducer(reducer, initialState);

  // 에디터 생성
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      if (editorElRef.current) {
        const editor = new Editor({
          el: editorElRef.current,
          initialValue: ' ',
          initialEditType: 'markdown',
          previewStyle: 'tab',
          placeholder: '설명을 입력하세요',
        });

        // 에디터를 ref에 설정
        editorRef.current = editor;

        // 에디터 오류로 인해 초기값을 공백으로 설정해서 잘못된 값을 지운 후 다시 빈 문자열로 설정한다
        setTimeout(() => {
          editor.setMarkdown(roadmapItem?.description || '');
        });
      }
    });
  }, [isOpen, roadmapItem]);

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

  const onChangeBorder = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setBorder', border: e.target.checked });
  }, []);

  const handleOnSearch = useCallback(
    (name: string) => {
      dispatch({ type: 'setName', name });
    },
    [dispatch],
  );

  const handleOnSelect = useCallback(
    (item: { name: string }) => {
      dispatch({ type: 'setName', name: item.name });
    },
    [dispatch],
  );

  const onClickApply = useCallback(() => {
    if (editorRef.current) {
      onClose({
        ...state,
        description: editorRef.current.getMarkdown(),
      });
      dispatch({ type: 'clearRoadmapItem' });
    }
  }, [onClose, state]);

  const onCloseModal = useCallback(() => {
    onClose();
    dispatch({ type: 'clearRoadmapItem' });
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>항목 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 항목명 */}
          <FormControl zIndex={1000} mb={5}>
            <ReactSearchAutocomplete
              placeholder="항목명을 입력하세요"
              items={autocompleteItems}
              inputSearchString={state.name}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              maxResults={5}
              showNoResults={false}
              inputDebounce={10}
            />
          </FormControl>

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

          {/* 진행상태 */}
          <Select placeholder="-- 진행상태 --" mb={5} size="sm" value={state.status ?? ''} onChange={onChangeStatus}>
            {Object.entries(ROADMAP_ITEM_STATUS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>

          {/* 에디터 */}
          <div ref={editorElRef} style={{ minHeight: '400px' }}></div>
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
  );
};
