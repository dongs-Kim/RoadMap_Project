import { useCallback, useRef, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { RoadmapFlow } from './RoadmapFlow';
import { RoadmapItemModal } from './RoadmapItemModal';
import { StickerModal } from './StickerModal';
import { EdgeData, EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../../Interface/roadmap';
import { StartNodeModal } from './StartNodeModal';
import { EdgeModal } from './EdgeModal';

export const Roadmap = () => {
  const { isOpen: isOpenItem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure();
  const { isOpen: isOpenSticker, onOpen: onOpenSticker, onClose: onCloseSticker } = useDisclosure();
  const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure();
  const { isOpen: isOpenEdge, onOpen: onOpenEdge, onClose: onCloseEdge } = useDisclosure();
  const [modalRoadmapItem, setModalRoadmapItem] = useState<RoadmapItem | undefined>();
  const [modalEdgeData, setModalEdgeData] = useState<EdgeData | undefined>();
  /**
   * 항목 modal을 열고 닫는 것을 비동기로 처리해 주기 위한 promise resolve ref
   */
  const modalResolveRef = useRef<((value?: RoadmapItem) => void) | null>(null);
  const modalEdgeResolveRef = useRef<((value?: EdgeData) => void) | null>(null);

  const onCloseItemModal = useCallback(
    (data?: RoadmapItem) => {
      if (modalResolveRef.current) {
        modalResolveRef.current(data);
        modalResolveRef.current = null;
      }
      onCloseItem();
      setModalRoadmapItem(undefined);
    },
    [onCloseItem],
  );

  const onCloseStickerModal = useCallback(
    (data?: RoadmapItem) => {
      if (modalResolveRef.current) {
        modalResolveRef.current(data);
        modalResolveRef.current = null;
      }
      onCloseSticker();
      setModalRoadmapItem(undefined);
    },
    [onCloseSticker],
  );

  const onCloseStartModal = useCallback(
    (data?: RoadmapItem) => {
      if (modalResolveRef.current) {
        modalResolveRef.current(data);
        modalResolveRef.current = null;
      }
      onCloseStart();
      setModalRoadmapItem(undefined);
    },
    [onCloseStart],
  );

  const onCloseEdgeModal = useCallback(
    (data?: EdgeData) => {
      if (modalEdgeResolveRef.current) {
        modalEdgeResolveRef.current(data);
        modalEdgeResolveRef.current = null;
      }
      onCloseEdge();
      setModalEdgeData(undefined);
    },
    [onCloseEdge],
  );

  const openModal = useCallback(
    (data: RoadmapItem, nodeType?: string) => {
      return new Promise<RoadmapItem | void>((resolve) => {
        setModalRoadmapItem(data);
        if (nodeType === EN_ROADMAP_NODE_TYPE.StickerNode) {
          onOpenSticker();
        } else if (nodeType === EN_ROADMAP_NODE_TYPE.StartNode) {
          onOpenStart();
        } else {
          onOpenItem();
        }
        modalResolveRef.current = resolve;
      });
    },
    [onOpenItem, onOpenSticker, onOpenStart],
  );

  const openEdgeModal = useCallback(
    (data: EdgeData) => {
      return new Promise<EdgeData | void>((resolve) => {
        setModalEdgeData(data);
        onOpenEdge();
        modalEdgeResolveRef.current = resolve;
      });
    },
    [onOpenEdge],
  );

  return (
    <>
      <RoadmapFlow openModal={openModal} openEdgeModal={openEdgeModal} />

      <RoadmapItemModal isOpen={isOpenItem} onClose={onCloseItemModal} roadmapItem={modalRoadmapItem} />
      <StickerModal isOpen={isOpenSticker} onClose={onCloseStickerModal} roadmapItem={modalRoadmapItem} />
      <StartNodeModal isOpen={isOpenStart} onClose={onCloseStartModal} roadmapItem={modalRoadmapItem} />
      <EdgeModal isOpen={isOpenEdge} onClose={onCloseEdgeModal} data={modalEdgeData} />
    </>
  );
};
