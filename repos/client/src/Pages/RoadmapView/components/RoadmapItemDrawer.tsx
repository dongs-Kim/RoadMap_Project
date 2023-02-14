import { ArrowRightIcon } from '@chakra-ui/icons';
import { Badge, Drawer, DrawerBody, DrawerContent, DrawerHeader, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { getRoadmapItemRequiredName, getRoadmapItemStatusName } from '../../../Constants/roadmapItem';
import { useViewer } from '../../../Hooks/useViewer';
import { RoadmapItem } from '../../../Interface/roadmap';

interface RoadmapItemDrawerProps {
  isOpen: boolean;
  onClose(): void;
  roadmapItem?: RoadmapItem;
}

export const RoadmapItemDrawer = ({ isOpen, onClose, roadmapItem }: RoadmapItemDrawerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
    <>
      <div ref={containerRef} className="view-drawer"></div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="md"
        onClose={onClose}
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        portalProps={{ containerRef }}
      >
        <DrawerContent className="view-drawer-content">
          <DrawerHeader borderBottomWidth="1px">
            <Flex alignItems="center">
              <IconButton
                icon={<ArrowRightIcon />}
                aria-label="close"
                mr={5}
                variant="ghost"
                size="sm"
                color="gray.500"
                onClick={onClose}
              />

              <Flex flexDir="column">
                <Flex alignItems="center" gap={2} pt={3}>
                  {/* 진행상태 */}
                  {roadmapItem?.status && (
                    <Badge colorScheme={getStatusColor()}>{getRoadmapItemStatusName(roadmapItem?.status)}</Badge>
                  )}

                  {/* 필수여부 */}
                  {roadmapItem?.required && (
                    <Badge variant="outline" colorScheme={getRequiredColor()}>
                      {getRoadmapItemRequiredName(roadmapItem?.required)}
                    </Badge>
                  )}
                </Flex>
                <Flex>
                  {/* 항목명 */}
                  <Text mr={2} fontSize="3xl">
                    {roadmapItem?.name}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {/* 설명 뷰어 */}
            <div ref={viewerElRef}></div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
