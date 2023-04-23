import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import _ from 'lodash';
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
                  {/* 카테고리 */}
                  {roadmapItem?.category && <Badge colorScheme="teal">{roadmapItem.category}</Badge>}

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
            {/* 학습 리소스 링크 */}
            <Box mb={5}>
              <Link
                as={RouterLink}
                to={`/LearnResource/list?category=${roadmapItem?.category}`}
                color="teal"
                target="_blank"
              >
                관련 학습 리소스
              </Link>
            </Box>

            {/* 설명 뷰어 */}
            <div ref={viewerElRef}></div>

            {/* 추천 학습 리소스 */}
            {!_.isEmpty(roadmapItem?.learnResources) && (
              <Box mt={12}>
                <Heading fontSize="lg" mb={3}>
                  추천 학습 리소스
                </Heading>
                {roadmapItem?.learnResources?.map((learnResource) => (
                  <Box key={learnResource.id}>
                    <Link as={RouterLink} to={`/LearnResource/view/${learnResource.id}`} color="teal" target="_blank">
                      {learnResource.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
