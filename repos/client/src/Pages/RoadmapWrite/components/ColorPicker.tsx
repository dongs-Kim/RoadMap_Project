import { Box, Center, Flex } from '@chakra-ui/react';
import { CirclePicker, ColorResult } from 'react-color';

const bgcolors = [
  '#ffffff',
  '#D9E3F0',
  '#9eabbf',
  '#ffff00',
  '#FFE599',
  '#F47373',
  '#37D67A',
  '#aee6ef',
  '#DCE775',
  '#FF8A65',
  '#dea7e7',
];

const linecolors = ['#2b78e4', '#ff5722', '#ff9800', '#4caf50', '#00bcd4', '#673ab7', '#795548', '#9e9e9e', '#607d8b'];

interface ColorPickerProps {
  color: string;
  isLine?: boolean;
  onChange?(color: ColorResult): void;
}

export const ColorPicker = ({ color, isLine, onChange }: ColorPickerProps) => {
  return (
    <Flex bg="gray.100" borderRadius={8} overflow="hidden" border="1px solid #ccc">
      <Center w={90} bg={color} borderRight="1px solid #ccc" fontSize="sm">
        {color}
      </Center>
      <Box p={3} pl={5} flex={1}>
        <CirclePicker
          colors={isLine ? linecolors : bgcolors}
          color={color}
          width="100%"
          onChange={onChange}
          circleSize={22}
        />
      </Box>
    </Flex>
  );
};
