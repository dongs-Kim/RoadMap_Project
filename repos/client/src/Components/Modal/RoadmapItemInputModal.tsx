import { useState, useCallback, ChangeEvent } from 'react';
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

interface RoadmapItemInputModalProps {
  onClose(data?: RoadmapItem): void;
  data: RoadmapItem;
  nodeType?: string;
}

const autocompleteItems = ROADMAP_ITEM_NAME_LIST.map(({ name }, i) => ({ id: i, name }));

export const RoadmapItemInputModal = ({ onClose, data, nodeType }: RoadmapItemInputModalProps) => {
  const [name, setName] = useState<string>(data.name);
  const [description, setDescription] = useState<string>(data.description);
  const [status, setStatus] = useState<string | undefined>(data.status);
  const [maxResults, setMaxResults] = useState<number>(0);

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
    onClose({ name, description, status: status as RoadmapItemStatus | undefined });
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

  const isSticker = useCallback(() => {
    return nodeType === EN_ROADMAP_NODE_TYPE.StickerNode;
  }, [nodeType]);

  return (
    <Modal isOpen={true} onClose={onModalClose}>
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
            <Textarea value={description} onChange={onChangeDescription} />
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
