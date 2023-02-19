import {
  Code,
  Flex,
  Heading,
  Kbd,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface UsageModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const UsageModal = ({ isOpen, onClose }: UsageModalProps) => {
  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로드맵 에디터 사용법</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={8}>
          <Flex flexDir="column" gap={10}>
            <Text>
              <Heading size="md" mb={2}>
                항목 만들기
              </Heading>
              항목 주변의 점을 드래그하거나 상단의 <Code colorScheme="yellow">항목추가</Code>를 누르면 새로운 항목을
              만들 수 있습니다
            </Text>
            <Text>
              <Heading size="md" mb={2}>
                항목/선 상세설정하기
              </Heading>
              항목이나 선을 <Code colorScheme="yellow">더블클릭</Code>하면 상세하게 설정할 수 있습니다
            </Text>
            <Text>
              <Heading size="md" mb={2}>
                뷰 조정하기
              </Heading>
              <List>
                <ListItem>
                  <Code colorScheme="yellow">마우스 휠</Code>로 줌을 조절할 수 있습니다
                </ListItem>
                <ListItem>
                  좌측 하단의 <Code colorScheme="yellow">fit view</Code>버튼을 누르면 로드맵이 화면에 맞게 조정됩니다
                </ListItem>
              </List>
            </Text>
            <Text>
              <Heading size="md" mb={2}>
                여러 도형 선택하기
              </Heading>
              <Kbd>shift</Kbd> 키를 누른 상태에서 마우스 드래그를 하면 여러 도형을 동시에 선택할 수 있습니다
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
