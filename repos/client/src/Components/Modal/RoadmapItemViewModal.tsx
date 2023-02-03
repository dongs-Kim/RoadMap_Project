import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { getRoadmapItemStatusName } from '../../Constants/roadmapItemStatus';
import { useViewer } from '../../Hooks/useViewer';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../Interface/roadmap';

interface RoadmapItemInputModalProps {
  onClose(data?: RoadmapItem): void;
  data: RoadmapItem;
  nodeType?: string;
}

export const RoadmapItemViewModal = ({ onClose, data, nodeType }: RoadmapItemInputModalProps) => {
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  useViewer(viewerElRef, data.description);

  const isSticker = useCallback(() => {
    return nodeType === EN_ROADMAP_NODE_TYPE.StickerNode;
  }, [nodeType]);

  const onModalClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onModalClose} size="3xl">
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
            {isSticker() && <span>{data.description}</span>}
            {!isSticker() && <div ref={viewerElRef}></div>}
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
