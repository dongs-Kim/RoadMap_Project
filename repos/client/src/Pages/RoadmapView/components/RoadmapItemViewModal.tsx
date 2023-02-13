import { useRef } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { RoadmapItem } from '../../../Interface/roadmap';
import { useViewer } from '../../../Hooks/useViewer';

interface RoadmapItemModalProps {
  isOpen: boolean;
  onClose(data?: RoadmapItem): void;
  roadmapItem?: RoadmapItem;
}

export const RoadmapItemViewModal = ({ isOpen, onClose, roadmapItem }: RoadmapItemModalProps) => {
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  useViewer(viewerElRef, roadmapItem?.description);

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{roadmapItem?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 진행상태 */}
          {/* 헤더에 오른쪽에 태그로 붙여서 보여주는게 좋을듯 */}
          <div>{roadmapItem?.status}</div>

          {/* 필수여부 */}
          <div>{roadmapItem?.required}</div>

          {/* 에디터 */}
          <div ref={viewerElRef} style={{ minHeight: '400px' }}></div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
