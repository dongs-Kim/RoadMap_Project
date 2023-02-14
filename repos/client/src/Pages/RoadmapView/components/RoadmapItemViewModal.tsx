import { useRef } from 'react';
import {
  Badge,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { RoadmapItem } from '../../../Interface/roadmap';
import { useViewer } from '../../../Hooks/useViewer';
import { getRoadmapItemRequiredName, getRoadmapItemStatusName } from '../../../Constants/roadmapItem';

interface RoadmapItemModalProps {
  isOpen: boolean;
  onClose(data?: RoadmapItem): void;
  roadmapItem?: RoadmapItem;
}

export const RoadmapItemViewModal = ({ isOpen, onClose, roadmapItem }: RoadmapItemModalProps) => {
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  useViewer(viewerElRef, roadmapItem?.description);

  const getStatusColor = () => {
    switch (roadmapItem?.status) {
      case 'todo':
        return 'gray';
      case 'ing':
        return 'orange';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getRequiredColor = () => {
    switch (roadmapItem?.required) {
      case 'optional':
        return 'gray';
      case 'required':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center" gap={2}>
            {/* 항목명 */}
            <Text mr={2}>{roadmapItem?.name}</Text>

            {/* 진행상태 */}
            <Badge colorScheme={getStatusColor()}>{getRoadmapItemStatusName(roadmapItem?.status)}</Badge>

            {/* 필수여부 */}
            <Badge variant="outline" colorScheme={getRequiredColor()}>
              {getRoadmapItemRequiredName(roadmapItem?.required)}
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 설명 뷰어 */}
          <div ref={viewerElRef}></div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
