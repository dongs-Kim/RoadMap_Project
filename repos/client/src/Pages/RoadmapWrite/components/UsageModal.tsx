import {
  Code,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
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
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">항목 생성</Td>
                  <Td>
                    항목 주변의 점 드래그 / 상단의 <Code colorScheme="yellow">항목추가</Code>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">항목 삭제</Td>
                  <Td>
                    항목 선택 후 <Kbd>Del</Kbd>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">상세설정</Td>
                  <Td>
                    <Code colorScheme="yellow">더블클릭</Code>
                  </Td>
                </Tr>

                <Tr>
                  <Td fontWeight="bold">줌</Td>
                  <Td>
                    <Code colorScheme="yellow">마우스 휠</Code>
                  </Td>
                </Tr>

                <Tr>
                  <Td fontWeight="bold">화면 맞춤</Td>
                  <Td>
                    좌측 하단의 <Code colorScheme="yellow">fit view</Code> 버튼
                  </Td>
                </Tr>

                <Tr>
                  <Td fontWeight="bold">여러 도형 선택</Td>
                  <Td>
                    <Kbd>shift</Kbd> 키 + 마우스 드래그 / <Kbd>ctrl</Kbd> 키 + 클릭
                  </Td>
                </Tr>

                <Tr>
                  <Td fontWeight="bold">복사/붙여넣기</Td>
                  <Td>
                    <Kbd>ctrl</Kbd> + <Kbd>c</Kbd> / <Kbd>ctrl</Kbd> + <Kbd>v</Kbd>
                  </Td>
                </Tr>

                <Tr>
                  <Td fontWeight="bold">실행취소/다시실행</Td>
                  <Td>
                    <Kbd>ctrl</Kbd> + <Kbd>z</Kbd> / <Kbd>ctrl</Kbd> + <Kbd>y</Kbd>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
