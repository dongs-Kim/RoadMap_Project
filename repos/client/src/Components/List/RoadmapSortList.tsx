import { Box, Button, Divider, Flex, Heading, List, ListItem, ResponsiveValue } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';

const sortButtons = [
  { id: 'recently', name: '최신', icon: <BiTime /> },
  { id: 'like', name: '좋아요', icon: <AiFillHeart /> },
];

interface RoadmapSortListProps extends PropsWithChildren {
  title: ReactNode;
  sort: string;
  width?: ResponsiveValue<string>;
  sort_mt?: number;
  sortRightItem?: ReactNode;
  pb?: number;
  onClickSort(id: string): void;
}

export const RoadmapSortList = ({
  title,
  sort,
  width,
  sort_mt,
  sortRightItem,
  pb,
  children,
  onClickSort,
}: RoadmapSortListProps) => {
  return (
    <Box pb={pb ?? 20} pt={10} w={width ?? '1410px'} m="0 auto">
      <Heading color="#333" pb="2" fontSize="3xl" ml="15px">
        {title}
      </Heading>
      <Flex justifyContent="space-between" ml="15px" mt={sort_mt ?? 5} mb={3}>
        <List display="flex" gap={3}>
          {sortButtons.map((sortButton) => (
            <ListItem key={sortButton.id}>
              <Button
                variant="ghost"
                leftIcon={sortButton.icon}
                color={sort === sortButton.id ? 'teal' : '#888'}
                onClick={() => onClickSort(sortButton.id)}
                colorScheme={sort === sortButton.id ? 'teal' : 'gray'}
                size="md"
              >
                {sortButton.name}
              </Button>
              {sort === sortButton.id && <Divider border="1px solid teal" />}
            </ListItem>
          ))}
        </List>
        {sortRightItem && <Box ml="auto">{sortRightItem}</Box>}
      </Flex>
      {children}
    </Box>
  );
};
