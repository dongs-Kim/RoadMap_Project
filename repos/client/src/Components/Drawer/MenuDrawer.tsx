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
import { CiMap } from 'react-icons/ci';
import { ROADMAP_CATEGORY } from '../../Constants/roadmap';
import { IUser } from '../../Interface/db';

interface MenuDrawerProps {
  isOpen: boolean;
  userData?: IUser;
  onClose(): void;
  onClickLogIn?(): void;
  onClickSignUp?(): void;
  onClickCategory?(category: string): void;
  onClickMypage?(): void;
  onClickFavoriteList?(): void;
  onClickProfile?(): void;
  onClickLogOut?(): void;
  onClickNewRoadMap?(): void;
  onClickMyLearnResource?(): void;
  onClickLearnResource?(): void;
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
  onClickNewRoadMap,
  onClickMyLearnResource,
  onClickLearnResource,
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
                      <MenuItem pb={3} onClick={onClickMyLearnResource}>
                        내 학습리소스
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

            <Flex>
              <Button
                leftIcon={<CiMap size="20px" />}
                variant="ghost"
                size="sm"
                borderRadius={20}
                colorScheme="gray"
                color="#555"
                onClick={onClickNewRoadMap}
              >
                새 로드맵 작성
              </Button>
            </Flex>

            <Flex flexDir="column" gap={3} mt={5}>
              <Text fontSize="lg" fontWeight="bold" onClick={onClickLearnResource}>
                학습 리소스
              </Text>

              <Text fontSize="lg" fontWeight="bold" mt={5}>
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
