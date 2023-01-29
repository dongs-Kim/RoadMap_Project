import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { getRoadmapItemStatusName } from '../../Constants/roadmapItemStatus';
import { RoadmapItem } from '../../Interface/roadmap';

interface RoadmapItemInputModalProps {
  onClose(data?: RoadmapItem): void;
  data: RoadmapItem;
}

export const RoadmapItemViewModal = ({ onClose, data }: RoadmapItemInputModalProps) => {
  const onModalClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로드맵 항목</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <label>항목명</label>
            <span>{data.name}</span>
          </div>
          <div>
            <label>설명</label>
            <span>{data.description}</span>
          </div>
          <div>
            <label>상태</label>
            <span>{getRoadmapItemStatusName(data.status)}</span>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
