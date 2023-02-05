import { useCallback, ChangeEvent } from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Select, Switch, Text } from '@chakra-ui/react';
import { Thumbnail } from './Thumbnail';
import { ContentsEditor } from './ContentsEditor';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { setCategory, setPublic, setTitle } from '../../../store/roadmapWriteSlice';
import { ROADMAP_CATEGORY } from '../../../Constants/roadmap';

export const LeftPanel = () => {
  const { title, category, public: isPublic } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();

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

  return (
    <Flex w="450px" borderRight="1px #ccc solid" bg="gray.100" flexDir="column">
      {/* 로고 */}
      <Flex bg="white" p="17px" pl={7} borderBottom="1px #ccc solid">
        <Text color="#333" fontSize="xl" fontFamily="'Mochiy Pop One', sans-serif">
          Dev Roadmap
        </Text>
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

        {/* 썸네일 */}
        <Thumbnail />

        {/* 에디터 */}
        <ContentsEditor />
      </Flex>
    </Flex>
  );
};
