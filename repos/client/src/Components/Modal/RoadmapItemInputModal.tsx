import { useState, useCallback, ChangeEvent } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { EN_ROADMAP_ITEM_STATUS, RoadmapItem } from '../../Interface/roadmap';
import { roadmapItemNameList } from '../../Constants/roadmap';

interface RoadmapItemInputModalProps {
  onClose(data?: RoadmapItem): void;
  data: RoadmapItem;
}

const autocompleteItems = roadmapItemNameList.map(({ name }, i) => ({ id: i, name }));

export const RoadmapItemInputModal = ({ onClose, data }: RoadmapItemInputModalProps) => {
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
    onClose({ name, description, status: status as EN_ROADMAP_ITEM_STATUS | undefined });
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
    <Modal isOpen={true} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로드맵 항목</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <FormControl>
            <FormLabel>설명</FormLabel>
            <Textarea value={description} onChange={onChangeDescription} />
          </FormControl>
          <FormControl>
            <FormLabel>상태</FormLabel>
            <Select value={status} onChange={onChangeStatus}>
              <option>-</option>
              <option value="todo">예정</option>
              <option value="ing">진행중</option>
              <option value="completed">완료</option>
            </Select>
          </FormControl>
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
