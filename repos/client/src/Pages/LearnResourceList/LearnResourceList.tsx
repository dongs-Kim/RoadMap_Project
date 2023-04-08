import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { BsPatchExclamation } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { Loading } from '../../Components/Page/Loading';
import { LearnResourceListDto, LearnResourceListItem, RoadmapLearnResourceDto } from '../../Interface/learnResource';
import { ItemAutocomplete } from '../RoadmapWrite/components/ItemAutocomplete';
import './pagination.css';

const PAGE_SIZE = 3;

interface LearnResourceListProps {
  isModal?: boolean;
  onClose?: () => void;
  onApply?: (learnResources: RoadmapLearnResourceDto[]) => void;
}

export const LearnResourceList = ({ isModal, onClose, onApply }: LearnResourceListProps) => {
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

  const loadLearnResources = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<LearnResourceListDto>('/api/learn-resource', {
        params: {
          category,
          keyword: searchKeyword,
          sort,
          page,
        },
      });
      setLeanResources(data);
    } finally {
      setLoading(false);
    }
  }, [category, searchKeyword, sort, page]);

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

  return (
    <>
      <Loading isOpen={loading} />

      <RoadmapSortList title="학습 리소스" onClickSort={onClickSort} sort={sort} width={isModal ? '100%' : undefined}>
        <FormControl zIndex={1000} mb={5}>
          <ItemAutocomplete
            placeholder="카테고리를 입력하세요"
            value={inputCategory}
            onChange={onChangeInputCategory}
            onComplete={onCategoryComplete}
          />
        </FormControl>

        <Input placeholder="검색 키워드" value={keyword} onChange={onChangeKeyword} onKeyDown={onKeyDownKeyword} />

        {!loading && learnResources.items.length == 0 && (
          <Flex justifyContent="center" marginTop="40px" flexDir="column" alignItems="center" gap="3">
            <BsPatchExclamation size="30px"></BsPatchExclamation>
            조회된 학습 리소스가 없습니다
          </Flex>
        )}
        {learnResources.items.length > 0 && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>카테고리</Th>
                  <Th>제목</Th>
                  <Th isNumeric>좋아요</Th>
                  <Th>작성자</Th>
                  <Th>작성일</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!loading &&
                  learnResources.items.map((resource) => (
                    <Tr key={resource.id}>
                      <Td>
                        <Checkbox
                          isChecked={isChecked(resource.id)}
                          onChange={() => onChangeSelectedItems(resource)}
                        ></Checkbox>
                      </Td>
                      <Td>{resource.category}</Td>
                      <Td>
                        <RouterLink to={`/LearnResource/view/${resource.id}`}>{resource.name}</RouterLink>
                      </Td>
                      <Td isNumeric>{resource.like}</Td>
                      <Td>{resource.user_nickname}</Td>
                      <Td>{resource.created_at}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {learnResources.items.length > 0 && pageCount > 1 && (
          <ReactPaginate
            activeClassName="active-page"
            // breakClassName={'item break-me '}
            breakLabel="..."
            containerClassName="pagination"
            // disabledClassName={'disabled-page'}
            nextClassName="next"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            pageClassName="page"
            pageRangeDisplayed={5}
            previousClassName="previous"
            previousLabel="<"
          />
        )}
      </RoadmapSortList>

      <Button colorScheme="teal" onClick={onClickApply}>
        적용
      </Button>
      <Button onClick={onClose}>닫기</Button>
    </>
  );
};
