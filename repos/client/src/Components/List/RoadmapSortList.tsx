import { Box, Button, Divider, Heading, List, ListItem } from '@chakra-ui/react';
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
  onClickSort(id: string): void;
}

export const RoadmapSortList = ({ title, sort, children, onClickSort }: RoadmapSortListProps) => {
  return (
    <Box pb={20} pt={10} w="1410px" m="0 auto">
      <Heading color="#333" pb="2" fontSize="3xl" ml="15px">
        {title}
      </Heading>
      <List display="flex" ml="15px" mt={5} mb={3} gap={3}>
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
      {children}
    </Box>
  );
};
