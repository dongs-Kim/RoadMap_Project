import { Box, Center, Flex, Tooltip } from '@chakra-ui/react';
import { CirclePicker, ColorResult } from 'react-color';

const bgcolors = [
  '#ffffff',
  '#D9E3F0',
  '#9eabbf',
  '#ffff00',
  '#FFE599',
  '#f49b9b',
  '#7ad6a1',
  '#caedf2',
  '#dee883',
  '#f5b09b',
  '#e8c8ed',
];

const linecolors = ['#2b78e4', '#ff5722', '#ff9800', '#4caf50', '#00bcd4', '#673ab7', '#795548', '#9e9e9e', '#607d8b'];

interface ColorPickerProps {
  color: string;
  isLine?: boolean;
  isColumn?: boolean;
  tooltip?: string;
  onChange?(color: ColorResult): void;
}

export const ColorPicker = ({ color, isLine, isColumn, tooltip, onChange }: ColorPickerProps) => {
  return (
    <Flex
      bg="gray.100"
      borderRadius={8}
      overflow="hidden"
      border="1px solid #ccc"
      flexDir={isColumn ? 'column' : 'row'}
    >
      <Tooltip label={tooltip}>
        <Center w={isColumn ? '100%' : 90} bg={color} borderRight="1px solid #ccc" fontSize="sm" p={2}>
          {color}
        </Center>
      </Tooltip>
      <Box p={3} pl={isColumn ? '17px' : 5} flex={1}>
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
