import { useCallback } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Square, Text } from '@chakra-ui/react';
import ReactImageUploading from 'react-images-uploading';
import { ExportInterface, ImageType } from 'react-images-uploading/dist/typings';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { setThumbnail } from '../../../store/roadmapWriteSlice';
import { saveThumbnailAsync } from '../../../Apis/roadmapApi';

export const Thumbnail = () => {
  const { id, thumbnail } = useAppSelector((state) => state.roadmapWrite);
  const dispatch = useAppDispatch();

  const onChangeThumbnail = useCallback(
    async (imageList: ImageType[]) => {
      const file = imageList[0]?.file;
      if (file) {
        const url = await saveThumbnailAsync(id, file);
        dispatch(setThumbnail(`${url}?t=${Date.now()}`));
      }
    },
    [id, dispatch],
  );

  const onClickDelete = useCallback(() => {
    dispatch(setThumbnail());
  }, [dispatch]);

  return (
    <ReactImageUploading value={[]} onChange={onChangeThumbnail} dataURLKey="thumbnail">
      {({ onImageUpload }: ExportInterface) => (
        <Flex mb={5}>
          {!thumbnail && (
            <Square
              bg="gray.200"
              color="gray.500"
              size="150px"
              border="1px #ccc solid"
              flexDir="column"
              cursor="pointer"
              gap={3}
              onClick={onImageUpload}
            >
              <AddIcon />
              <Text fontSize="sm">썸네일 추가</Text>
            </Square>
          )}
          {thumbnail && (
            <Square bg="gray.200" size="150px" position="relative" color="white" border="1px #ccc solid">
              <Image src={thumbnail} alt="Thumbnail" maxH="100%" />
              <Box position="absolute" top={0} right={0} bg="black" p={1} cursor="pointer" onClick={onClickDelete}>
                <MinusIcon boxSize={3} display="block" />
              </Box>
            </Square>
          )}
        </Flex>
      )}
    </ReactImageUploading>
  );
};
