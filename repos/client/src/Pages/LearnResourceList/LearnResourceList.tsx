import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { BsPatchExclamation } from 'react-icons/bs';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { LoginDialog } from '../../Components/Dialog/LoginDialog';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { Loading } from '../../Components/Page/Loading';
import { useUser } from '../../Hooks/dataFetch/useUser';
import { useTitle } from '../../Hooks/useTitle';
import { LearnResourceListDto, LearnResourceListItem, RoadmapLearnResourceDto } from '../../Interface/learnResource';
import { ItemAutocomplete } from '../RoadmapWrite/components/ItemAutocomplete';
import './pagination.css';

const PAGE_SIZE = 10;

export interface LearnResourceListProps {
  title?: string;
  isModal?: boolean;
  isMyResource?: boolean;
  onClose?: () => void;
  onApply?: (learnResources: RoadmapLearnResourceDto[]) => void;
  writeLearnResource?: () => void;
}

export const LearnResourceList = ({
  title,
  isModal,
  isMyResource,
  onClose,
  onApply,
  writeLearnResource,
}: LearnResourceListProps) => {
  useTitle(`학습 리소스 - Dev Roadmap`);
  const [searchParam] = useSearchParams();
  const categoryQuery = searchParam.get('category');
  const [learnResources, setLeanResources] = useState<LearnResourceListDto>({ items: [], totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categoryQuery ?? '');
  const [inputCategory, setInputCategory] = useState(categoryQuery ?? '');
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState('recently');
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<LearnResourceListItem[]>([]);
  const [isMy, setIsMy] = useState(isMyResource ?? false);
  const { userData, isLogined } = useUser();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const navigate = useNavigate();

  const getPageSize = useCallback(() => {
    if (isModal) {
      return 5;
    }
    return PAGE_SIZE;
  }, [isModal]);

  const loadLearnResources = useCallback(async () => {
    setLoading(true);
    if (isMy && !isLogined) {
      return;
    }
    try {
      const { data } = await axios.get<LearnResourceListDto>('/api/learn-resource', {
        params: {
          category,
          keyword: searchKeyword,
          user_id: isMy ? userData?.id : undefined,
          sort,
          page,
          pageSize: isModal ? 5 : getPageSize(),
        },
      });
      setLeanResources(data);
    } finally {
      setLoading(false);
    }
  }, [isMy, isLogined, category, searchKeyword, userData?.id, sort, page, isModal, getPageSize]);

  useEffect(() => {
    loadLearnResources();
  }, [loadLearnResources]);

  const onClickSort = useCallback((id: string) => {
    setSort(id);
  }, []);

  const onChangeInputCategory = useCallback((value: string) => {
    setInputCategory(value);
  }, []);

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const onKeyDownKeyword = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setPage(1);
        setSearchKeyword(keyword);
      }
    },
    [keyword],
  );

  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    setPage(selected + 1);
  }, []);

  const onCategoryComplete = useCallback(
    (value?: string) => {
      setTimeout(() => {
        setPage(1);
        setCategory(value ?? inputCategory);
      }, 0);
    },
    [inputCategory],
  );

  const isChecked = useCallback(
    (id: string) => {
      return selectedItems.some((item) => item.id === id);
    },
    [selectedItems],
  );

  const onChangeSelectedItems = useCallback(
    (item: LearnResourceListItem) => {
      if (isChecked(item.id)) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems, isChecked],
  );

  const onClickApply = useCallback(() => {
    onApply?.(selectedItems);
    onClose?.();
  }, [onApply, onClose, selectedItems]);

  const onClickMy = useCallback(() => {
    setPage(1);
    setIsMy(!isMy);
  }, [isMy]);

  const onClickWrite = useCallback(() => {
    if (isLogined) {
      if (isModal) {
        writeLearnResource?.();
      } else {
        navigate('/LearnResource/write');
      }
    } else {
      onOpenLogin();
    }
  }, [writeLearnResource, navigate, isModal, isLogined, onOpenLogin]);

  const pageCount = Math.ceil(learnResources.totalCount / getPageSize());

  return (
    <>
      <Loading isOpen={loading} />

      <RoadmapSortList
        title={
          <>
            <Flex justifyContent="space-between">
              {title ?? '학습 리소스'}
              <Flex alignItems="center">
                <Input
                  placeholder="검색 키워드"
                  bg="#fff"
                  value={keyword}
                  w="300px"
                  mr={3}
                  onChange={onChangeKeyword}
                  onKeyDown={onKeyDownKeyword}
                />
                {isLogined && isModal && (
                  <Button colorScheme={isMy ? 'green' : 'gray'} mr={3} size="sm" onClick={onClickMy}>
                    내 학습 리소스
                  </Button>
                )}
                <Button colorScheme="blue" onClick={onClickWrite}>
                  새로 만들기
                </Button>
              </Flex>
            </Flex>
          </>
        }
        onClickSort={onClickSort}
        sort={sort}
        width={isModal ? '100%' : { base: '100%', md: '800px', lg: '1000px' }}
        pb={isModal ? 5 : 20}
        sortRightItem={
          <FormControl zIndex={1000} w="300px">
            <ItemAutocomplete
              placeholder="카테고리를 입력하세요"
              value={inputCategory}
              onChange={onChangeInputCategory}
              onComplete={onCategoryComplete}
            />
          </FormControl>
        }
      >
        {!loading && learnResources.items.length == 0 && (
          <Flex justifyContent="center" marginTop="40px" flexDir="column" alignItems="center" gap="3">
            <BsPatchExclamation size="30px"></BsPatchExclamation>
            조회된 학습 리소스가 없습니다
          </Flex>
        )}
        {learnResources.items.length > 0 && (
          <TableContainer mt={8}>
            <Table variant="unstyled" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                {isModal && <col width="50px"></col>}
                <col width="100px"></col>
                <col width="450px"></col>
                <col width="100px"></col>
                <col width="100px"></col>
                <col width="80px"></col>
              </colgroup>

              <Thead borderTop="1px solid #ccc" borderBottom="1px solid #ccc">
                <Tr>
                  {isModal && <Th></Th>}
                  <Th>카테고리</Th>
                  <Th>제목</Th>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                  <Th isNumeric>좋아요</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!loading &&
                  learnResources.items.map((resource) => (
                    <Tr key={resource.id} fontSize="11pt" borderBottom="1px solid #ddd">
                      {isModal && (
                        <Td>
                          <Checkbox
                            isChecked={isChecked(resource.id)}
                            onChange={() => onChangeSelectedItems(resource)}
                          ></Checkbox>
                        </Td>
                      )}
                      <Td fontSize="sm" fontWeight="500">
                        {resource.category}
                      </Td>
                      <Td overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                        <Link
                          as={RouterLink}
                          color="teal"
                          to={`/LearnResource/view/${resource.id}`}
                          target={isModal ? '_blank' : '_self'}
                        >
                          {resource.name}
                        </Link>
                      </Td>
                      <Td>
                        <RouterLink to={`/Roadmap/User/${resource.user_id}`}>
                          <Flex fontSize="xs" ml="2" gap={2} alignItems="center">
                            <Avatar size="xs" name={resource.user_nickname} src={resource.user_image} />
                            <Text>{resource.user_nickname}</Text>
                          </Flex>
                        </RouterLink>
                      </Td>
                      <Td fontSize="sm">
                        <Text>{dayjs(resource.created_at).fromNow()}</Text>
                      </Td>
                      <Td isNumeric fontSize="sm">
                        {resource.like}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {learnResources.items.length > 0 && pageCount > 1 && (
          <ReactPaginate
            activeClassName="active"
            // breakClassName={'item break-me '}
            breakLabel="..."
            containerClassName="pagination"
            // disabledClassName={'disabled-page'}
            nextClassName="next"
            nextLabel={<GrFormNext />}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName="page"
            pageRangeDisplayed={5}
            previousClassName="previous"
            previousLabel={<GrFormPrevious />}
            forcePage={page - 1}
          />
        )}

        {isModal && (
          <Flex w="100%" justifyContent="flex-end">
            <Flex gap={3}>
              <Button colorScheme="teal" onClick={onClickApply}>
                적용
              </Button>
              <Button onClick={onClose}>닫기</Button>
            </Flex>
          </Flex>
        )}
      </RoadmapSortList>

      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
};
