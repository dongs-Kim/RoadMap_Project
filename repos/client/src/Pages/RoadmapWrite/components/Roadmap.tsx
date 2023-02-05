import { useCallback, useRef, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { RoadmapFlow } from './RoadmapFlow';
import { RoadmapItemModal } from './RoadmapItemModal';
import { StickerModal } from './StickerModal';
import { EN_ROADMAP_NODE_TYPE, RoadmapItem } from '../../../Interface/roadmap';

export const Roadmap = () => {
  const { isOpen: isOpenItem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure();
  const { isOpen: isOpenSticker, onOpen: onOpenSticker, onClose: onCloseSticker } = useDisclosure();
  const [modalRoadmapItem, setModalRoadmapItem] = useState<RoadmapItem | undefined>();
  /**
   * 항목 modal을 열고 닫는 것을 비동기로 처리해 주기 위한 promise resolve ref
   */
  const modalResolveRef = useRef<((value?: RoadmapItem) => void) | null>(null);

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

  const openModal = useCallback(
    (data: RoadmapItem, nodeType?: string) => {
      return new Promise<RoadmapItem | void>((resolve) => {
        setModalRoadmapItem(data);
        if (nodeType === EN_ROADMAP_NODE_TYPE.StickerNode) {
          onOpenSticker();
        } else {
          onOpenItem();
        }
        modalResolveRef.current = resolve;
      });
    },
    [onOpenItem, onOpenSticker],
  );

  return (
    <>
      <RoadmapFlow openModal={openModal} />

      <RoadmapItemModal isOpen={isOpenItem} onClose={onCloseItemModal} roadmapItem={modalRoadmapItem} />
      <StickerModal isOpen={isOpenSticker} onClose={onCloseStickerModal} roadmapItem={modalRoadmapItem} />
    </>
  );
};
