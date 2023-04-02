import { Flex, Input, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { BsPatchExclamation } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { RoadmapSortList } from '../../Components/List/RoadmapSortList';
import { Loading } from '../../Components/Page/Loading';
import { LearnResourceListDto } from '../../Interface/learnResource';
import './pagination.css';

const PAGE_SIZE = 3;

export const LearnResourceList = () => {
  const [learnResources, setLeanResources] = useState<LearnResourceListDto>({ items: [], totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState('recently');
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(learnResources.totalCount / PAGE_SIZE);

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

  const onChangeCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
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

  return (
    <>
      <Loading isOpen={loading} />

      <RoadmapSortList title="학습 리소스" onClickSort={onClickSort} sort={sort}>
        <Select placeholder="-- 카테고리 --" value={category} onChange={onChangeCategory}>
          <option>React</option>
          <option>C#</option>
        </Select>
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
                      <Td>{resource.category}</Td>
                      <Td>{resource.name}</Td>
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
    </>
  );
};
