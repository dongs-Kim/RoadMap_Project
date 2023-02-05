import { Box, Center, Flex } from '@chakra-ui/react';
import { CirclePicker, ColorResult } from 'react-color';

const colors = [
  '#ffffff',
  '#D9E3F0',
  '#697689',
  '#ffff00',
  '#FFE599',
  '#F47373',
  '#37D67A',
  '#2CCCE4',
  '#DCE775',
  '#FF8A65',
  '#BA68C8',
];

interface ColorPickerProps {
  color: string;
  onChange?(color: ColorResult): void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <Flex bg="gray.100" borderRadius={8} overflow="hidden" border="1px solid #ccc">
      <Center w={90} bg={color} borderRight="1px solid #ccc" fontSize="sm">
        {color}
      </Center>
      <Box p={3} pl={5} flex={1}>
        <CirclePicker colors={colors} color={color} width="100%" onChange={onChange} circleSize={22} />
      </Box>
    </Flex>
  );
};
