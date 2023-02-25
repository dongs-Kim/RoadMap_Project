import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ROADMAP_CATEGORY } from '../../Constants/roadmap';

interface MenuDrawerProps {
  isOpen: boolean;
  userData?: any;
  onClose(): void;
  onClickLogIn?(): void;
  onClickSignUp?(): void;
  onClickCategory?(category: string): void;
  onClickMypage?(): void;
  onClickFavoriteList?(): void;
  onClickProfile?(): void;
  onClickLogOut?(): void;
}

export const MenuDrawer = ({
  isOpen,
  userData,
  onClose,
  onClickLogIn,
  onClickSignUp,
  onClickCategory,
  onClickMypage,
  onClickFavoriteList,
  onClickProfile,
  onClickLogOut,
}: MenuDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} closeOnOverlayClick>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <Flex flexDir="column" gap={3} alignItems="flex-start">
            <Flex mt={3}>
              {!userData && (
                <>
                  <Button colorScheme="teal" variant="ghost" borderRadius={20} onClick={onClickLogIn}>
                    로그인
                  </Button>
                  <Button colorScheme="teal" variant="solid" borderRadius={20} onClick={onClickSignUp}>
                    회원가입
                  </Button>
                </>
              )}
              {userData && (
                <span>
                  <Menu>
                    <MenuButton
                      size="sm"
                      colorScheme="#333"
                      variant="ghost"
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {userData.image && <Avatar size="sm" name={userData?.nickname} src={userData?.image} />}
                      {!userData.image && <Avatar size="sm" name={userData?.nickname} />}
                    </MenuButton>
                    <MenuList color="#333" fontFamily="monospace">
                      <MenuItem pb={3} onClick={onClickMypage}>
                        내 로드맵
                      </MenuItem>
                      <MenuItem pb={3} onClick={onClickFavoriteList}>
                        북마크
                      </MenuItem>
                      <MenuItem pb={3} onClick={onClickProfile}>
                        프로필 수정
                      </MenuItem>
                      <MenuItem pb={3} onClick={onClickLogOut}>
                        로그아웃
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </span>
              )}
            </Flex>

            <Flex flexDir="column" gap={3} mt={5}>
              <Text fontSize="lg" fontWeight="bold">
                카테고리
              </Text>
              <List display="flex" flexDir="column">
                {ROADMAP_CATEGORY.map((item) => (
                  <ListItem key={item.id}>
                    <Button variant="unstyled" onClick={() => onClickCategory?.(item.id)}>
                      {item.name}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
