import { useRef, useEffect, useCallback, useReducer, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
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
} from '@chakra-ui/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Editor from '@toast-ui/editor';
import { ColorResult } from 'react-color';
import { RoadmapItem } from '../../../Interface/roadmap';
import { ColorPicker } from './ColorPicker';
import { ROADMAP_ITEM_NAME_LIST } from '../../../Constants/roadmap';
import {
  RoadmapItemRequired,
  RoadmapItemStatus,
  ROADMAP_ITEM_REQUIRED,
  ROADMAP_ITEM_STATUS,
} from '../../../Constants/roadmapItem';
import { ItemAutocomplete } from './ItemAutocomplete';

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
  required: '',
};
type SetRoadmapItemAction = { type: 'setRoadmapItem'; roadmapItem: RoadmapItem };
type ClearRoadmapItemAction = { type: 'clearRoadmapItem' };
type SetNameAction = { type: 'setName'; name: string };
type SetBgColorAction = { type: 'setBgColor'; bgcolor: string };
type SetDescriptionAction = { type: 'setDescription'; description: string };
type SetStatusAction = { type: 'setStatus'; status?: RoadmapItemStatus };
type SetBorderAction = { type: 'setBorder'; border: boolean };
type SetRequiredAction = { type: 'setRequired'; required?: RoadmapItemRequired };
type Action =
  | SetBgColorAction
  | SetRoadmapItemAction
  | SetNameAction
  | SetDescriptionAction
  | SetStatusAction
  | SetBorderAction
  | ClearRoadmapItemAction
  | SetRequiredAction;

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
    case 'setRequired':
      return { ...state, required: action.required };
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

  // ????????? ??????
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
          placeholder: '????????? ???????????????',
        });

        // ???????????? ref??? ??????
        editorRef.current = editor;

        // ????????? ????????? ?????? ???????????? ???????????? ???????????? ????????? ?????? ?????? ??? ?????? ??? ???????????? ????????????
        setTimeout(() => {
          editor.setMarkdown(roadmapItem?.description || '');
        });
      }
    });
  }, [isOpen, roadmapItem]);

  // ????????? ??????
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
      dispatch({ type: 'clearRoadmapItem' });
    }
  }, [onClose, state]);

  const onCloseModal = useCallback(() => {
    onClose();
    dispatch({ type: 'clearRoadmapItem' });
  }, [onClose]);

  const onChangeName = useCallback((name: string) => {
    dispatch({ type: 'setName', name });
  }, []);

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>?????? ??????</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* ????????? */}
          <FormControl zIndex={1000} mb={5}>
            <ItemAutocomplete placeholder="???????????? ???????????????" value={state.name} onChange={onChangeName} />
          </FormControl>

          <Flex mb={5} alignItems="center" justifyContent="space-between">
            {/* ????????? */}
            <Box flex={1} mr={2}>
              <ColorPicker color={state.bgcolor} onChange={onChangeBgColor} />
            </Box>

            {/* ????????? */}
            <FormControl display="flex" alignItems="center" width={90} justifyContent="flex-end">
              <FormLabel mb="0" color="#666" fontWeight="thin" fontSize="sm">
                ?????????
              </FormLabel>
              <Switch colorScheme="teal" isChecked={state.border} onChange={onChangeBorder} />
            </FormControl>
          </Flex>

          {/* ???????????? */}
          <InputGroup mb={5}>
            <InputLeftAddon>
              <Text fontSize="sm">????????????</Text>
            </InputLeftAddon>
            <Select placeholder="----" value={state.status ?? ''} onChange={onChangeStatus}>
              {Object.entries(ROADMAP_ITEM_STATUS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Select>
          </InputGroup>

          {/* ???????????? */}
          <InputGroup mb={5}>
            <InputLeftAddon>
              <Text fontSize="sm">????????????</Text>
            </InputLeftAddon>
            <Select placeholder="----" value={state.required ?? ''} onChange={onChangeRequired}>
              {Object.entries(ROADMAP_ITEM_REQUIRED).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Select>
          </InputGroup>

          {/* ????????? */}
          <div ref={editorElRef} style={{ minHeight: '400px' }}></div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClickApply}>
            ??????
          </Button>
          <Button variant="ghost" onClick={onCloseModal}>
            ??????
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
