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
import { toastSuccess } from '../../Utils/toast';
import { LearnResourceDeleteDialog } from '../MyLearnResource/components/LearnResourceDeleteDialog';
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
  const pageCount = Math.ceil(learnResources.totalCount / PAGE_SIZE);
  const [selectedItems, setSelectedItems] = useState<LearnResourceListItem[]>([]);
  const [isMy, setIsMy] = useState(isMyResource ?? false);
  const { userData, isLogined } = useUser();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const [toDeleteId, setToDeleteId] = useState<string>();
  const navigate = useNavigate();

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
        },
      });
      setLeanResources(data);
    } finally {
      setLoading(false);
    }
  }, [category, searchKeyword, isMy, userData, sort, page, isLogined]);

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
      setTimeout(() => setCategory(value ?? inputCategory));
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
    setIsMy(!isMy);
  }, [isMy]);

  const onClickDelete = useCallback(
    (id: string) => {
      setToDeleteId(id);
      onOpenDelete();
    },
    [onOpenDelete],
  );

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`/api/learn-resource/${toDeleteId}`);
      toastSuccess('삭제했습니다');
      setToDeleteId(undefined);
      loadLearnResources();
    } finally {
      onCloseDelete();
    }
  }, [toDeleteId, loadLearnResources, onCloseDelete]);

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

  return (
    <>
      <Loading isOpen={loading} />

      <RoadmapSortList
        title={
          <>
            <Flex justifyContent="space-between">
              {title ?? '학습 리소스'}
              <Flex>
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
                  <Button colorScheme={isMy ? 'blue' : 'gray'} size="sm" onClick={onClickMy}>
                    내가 작성한 리소스
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
          <TableContainer mt={5}>
            <Table variant="unstyled" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                {isModal && <col width="50px"></col>}
                <col width="100px"></col>
                <col width="450px"></col>
                <col width="100px"></col>
                <col width="100px"></col>
                <col width="80px"></col>
                {isMyResource && (
                  <>
                    <col width="50px"></col>
                    <col width="50px"></col>
                  </>
                )}
              </colgroup>

              <Thead bg="#fff" borderTop="1px solid #ccc" borderBottom="1px solid #ccc">
                <Tr>
                  {isModal && <Th></Th>}
                  <Th>카테고리</Th>
                  <Th>제목</Th>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                  <Th isNumeric>좋아요</Th>
                  {isMyResource && (
                    <>
                      <Th></Th>
                      <Th></Th>
                    </>
                  )}
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
                        <Link as={RouterLink} color="teal" to={`/LearnResource/view/${resource.id}`}>
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
                      {isMyResource && (
                        <>
                          <Td>
                            <RouterLink to={`/LearnResource/write/${resource.id}`}>수정</RouterLink>
                          </Td>
                          <Td>
                            <Button colorScheme="red" size="sm" onClick={() => onClickDelete(resource.id)}>
                              삭제
                            </Button>
                          </Td>
                        </>
                      )}
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
          />
        )}
      </RoadmapSortList>

      {isModal && (
        <>
          <Button colorScheme="teal" onClick={onClickApply}>
            적용
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </>
      )}

      <LearnResourceDeleteDialog isOpen={isOpenDelete} onClose={onCloseDelete} onDelete={onDelete} />
      <LoginDialog isOpen={isOpenLogin} onClose={onCloseLogin} />
    </>
  );
};
