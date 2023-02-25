import { useCallback, ChangeEvent, useEffect } from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Select, Switch, Text, useDisclosure } from '@chakra-ui/react';
import { Thumbnail } from './Thumbnail';
import { ContentsEditor } from './ContentsEditor';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { setBgcolor, setCategory, setPublic, setTitle } from '../../../store/roadmapWriteSlice';
import { ROADMAP_CATEGORY } from '../../../Constants/roadmap';
import { RiTreasureMapLine } from 'react-icons/ri';
import { MoveConfirmDialog } from './MoveConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { ColorPicker } from './ColorPicker';
import { ColorResult } from 'react-color';

export const LeftPanel = () => {
  const { title, category, public: isPublic, thumbnail, bgcolor } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bgcolor) {
      dispatch(setBgcolor('#d9e3f0'));
    }
  }, [dispatch, bgcolor]);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle(e.target.value));
    },
    [dispatch],
  );

  const onChangeCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setCategory(e.target.value));
    },
    [dispatch],
  );

  const onChangePulic = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setPublic(e.target.checked));
    },
    [dispatch],
  );

  const onChangeBgColor = useCallback(
    (color: ColorResult) => {
      dispatch(setBgcolor(color.hex));
    },
    [dispatch],
  );

  const onMove = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Flex w="450px" borderRight="1px #ccc solid" bg="gray.100" flexDir="column">
      {/* 로고 */}
      <Flex bg="white" p="17px" pl={7} borderBottom="1px #ccc solid">
        <Flex alignItems="center" gap={2} onClick={onOpen} cursor="pointer">
          <RiTreasureMapLine size="28px" />
          <Text color="#333" fontSize="xl" fontFamily="'Mochiy Pop One', sans-serif">
            Dev Roadmap
          </Text>
        </Flex>
      </Flex>

      <Flex p={5} flex={1} flexDir="column">
        <Flex gap="10px" mb="20px">
          {/* 카테고리 */}
          <Box flex="1">
            <Select
              placeholder="-- 카테고리 --"
              size="sm"
              w="200px"
              bg="white"
              value={category ?? ''}
              onChange={onChangeCategory}
            >
              {ROADMAP_CATEGORY.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>

          {/* 공개 */}
          <Flex flex="1">
            <FormControl display="flex" alignItems="center" justifyContent="flex-end">
              <FormLabel mb="0" color="#666" fontWeight="thin">
                공개
              </FormLabel>
              <Switch colorScheme="teal" isChecked={isPublic} onChange={onChangePulic} />
            </FormControl>
          </Flex>
        </Flex>

        {/* 제목 */}
        <Input
          variant="flushed"
          placeholder="제목을 입력하세요"
          fontWeight="bold"
          fontSize="2xl"
          mb={5}
          value={title}
          onChange={onChangeTitle}
        />

        <Flex gap={3} mb={5}>
          {/* 썸네일 */}
          <Thumbnail />

          {/* 배경색 */}
          {!thumbnail && bgcolor && (
            <ColorPicker color={bgcolor} onChange={onChangeBgColor} isColumn tooltip={'썸네일 배경색'} />
          )}
        </Flex>

        {/* 에디터 */}
        <ContentsEditor />
      </Flex>

      <MoveConfirmDialog isOpen={isOpen} onClose={onClose} onMove={onMove} />
    </Flex>
  );
};
