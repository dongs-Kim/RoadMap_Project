import { useState, useCallback, ChangeEvent, useEffect, useRef } from 'react';
import {
  Button,
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
  Textarea,
} from '@chakra-ui/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../Interface/roadmap';
import { ROADMAP_ITEM_NAME_LIST } from '../../Constants/roadmap';
import { RoadmapItemStatus } from '../../Constants/roadmapItemStatus';
import { useEditor } from '../../Hooks/useEditor';

interface RoadmapItemInputModalProps {
  onClose(data?: RoadmapItem): void;
  data?: RoadmapItem;
  nodeType?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

const autocompleteItems = ROADMAP_ITEM_NAME_LIST.map(({ name }, i) => ({ id: i, name }));

export const RoadmapItemInputModal = ({ onClose, data, nodeType, containerRef }: RoadmapItemInputModalProps) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>('');
  const [maxResults, setMaxResults] = useState<number>(0);
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditor(editorElRef);

  const isSticker = useCallback(() => {
    return nodeType === EN_ROADMAP_NODE_TYPE.StickerNode;
  }, [nodeType]);

  // 데이터 설정
  useEffect(() => {
    if (data) {
      setName(data.name);
      setStatus(data.status);
      if (isSticker()) {
        setDescription(data.description);
      } else {
        editor?.setMarkdown(data.description);
      }
    }
  }, [data, isSticker, editor]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);
  const onChangeStatus = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  }, []);

  const onModalClose = () => {
    onClose();
  };
  const onApply = () => {
    onClose({
      name,
      description: isSticker() ? description : editor?.getMarkdown() ?? '',
      status: status as RoadmapItemStatus | undefined,
    });
  };

  const handleOnSearch = (name: string) => {
    setName(name);
  };

  const handleOnSelect = (item: { name: string }) => {
    setName(item.name);
  };

  const handleOnFocus = () => {
    setMaxResults(5);
  };

  return (
    <Modal isOpen={true} size="3xl" onClose={onModalClose} portalProps={{ containerRef }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로드맵 항목</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!isSticker() && (
            <FormControl zIndex={1000}>
              <FormLabel>항목명</FormLabel>
              <ReactSearchAutocomplete
                items={autocompleteItems}
                inputSearchString={name}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                showNoResults={false}
                maxResults={maxResults}
                inputDebounce={10}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>설명</FormLabel>
            {isSticker() && <Textarea value={description} onChange={onChangeDescription} />}
            <div ref={editorElRef} style={{ display: isSticker() ? 'none' : 'block' }}></div>
          </FormControl>
          {!isSticker() && (
            <FormControl>
              <FormLabel>상태</FormLabel>
              <Select value={status} onChange={onChangeStatus}>
                <option>-</option>
                <option value="todo">예정</option>
                <option value="ing">진행중</option>
                <option value="completed">완료</option>
              </Select>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onApply}>
            적용
          </Button>
          <Button variant="ghost" onClick={onModalClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
