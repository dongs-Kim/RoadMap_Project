import { ChangeEvent, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Button, Flex, FormControl, Heading, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import Editor from '@toast-ui/editor';
import { LearnResourceCreateDto } from '../../Interface/learnResource';
import { createLearnResourceAsync } from '../../Apis/learnResourceApi';
import { ItemAutocomplete } from '../RoadmapWrite/components/ItemAutocomplete';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  clearLearnResource,
  getLearnResource,
  setCategory,
  setName,
  setUrl,
} from '../../store/learnResourceWriteSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle } from '../../Hooks/useTitle';
import { Loading } from '../../Components/Page/Loading';
import { toastError, toastSuccess } from '../../Utils/toast';

interface LearnResourceWriteProps {
  goList?(): void;
}

export const LearnResourceWrite = ({ goList }: LearnResourceWriteProps) => {
  const { id } = useParams();
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const state = useAppSelector((state) => state.learnResourceWrite);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useTitle('학습 리소스 작성 - Dev Roadmap');

  const mode = useMemo(() => {
    if (id) {
      return 'modify';
    }
    return 'new';
  }, [id]);

  const initLearnResource = useCallback(async () => {
    if (id) {
      // 수정
      await dispatch(getLearnResource({ id }));
    } else {
      // 신규
      await dispatch(clearLearnResource());
    }
    setLoading(false);
  }, [dispatch, id]);

  // 데이터 조회
  useEffect(() => {
    initLearnResource();
  }, [initLearnResource]);

  // 에디터 생성
  useEffect(() => {
    if (editorElRef.current && !editorRef.current) {
      const editor = new Editor({
        el: editorElRef.current,
        initialValue: ' ',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        placeholder: '설명을 입력하세요',
      });

      // 에디터를 ref에 설정
      editorRef.current = editor;

      // 에디터 오류로 인해 초기값을 공백으로 설정해서 잘못된 값을 지운 후 다시 빈 문자열로 설정한다
      if (mode === 'new') {
        setTimeout(() => {
          editor.setMarkdown(state.contents ?? '');
        });
      }
    }
  }, [state.contents, mode]);

  //로딩 후 에디터 설정
  useEffect(() => {
    if (editorRef.current && !loading) {
      editorRef.current.setMarkdown(state.contents ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  //unmount시 초기화
  useEffect(() => {
    return () => {
      dispatch(clearLearnResource());
    };
  }, [dispatch]);

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setName(e.target.value));
    },
    [dispatch],
  );

  const onChangeCategory = useCallback(
    (value: string) => {
      dispatch(setCategory(value));
    },
    [dispatch],
  );

  const onChangeUrl = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setUrl(e.target.value));
    },
    [dispatch],
  );

  const validateSave = useCallback((saveDto: LearnResourceCreateDto) => {
    if (!saveDto.name) {
      toastError('제목을 입력해 주세요');
      return false;
    }
    if (!saveDto.category) {
      toastError('카테고리를 입력해 주세요');
      return false;
    }
    return true;
  }, []);

  const onClickPrev = useCallback(() => {
    if (goList) {
      goList();
    } else {
      navigate(-1);
    }
  }, [goList, navigate]);

  const onClickSave = useCallback(async () => {
    if (!editorRef.current) {
      return;
    }

    const saveDto: LearnResourceCreateDto = {
      id: mode === 'modify' ? state.id : undefined,
      name: state.name,
      category: state.category,
      contents: editorRef.current.getMarkdown(),
      url: state.url,
      mode,
    };

    //유효성 검사
    if (!validateSave(saveDto)) {
      return;
    }

    // 저장
    try {
      await createLearnResourceAsync(saveDto);
      toastSuccess('학습 리소스를 저장했습니다');
      onClickPrev();
    } catch {
      toastError('저장하지 못했습니다');
    }
  }, [state, validateSave, mode, onClickPrev]);

  return (
    <>
      {/* 로딩 */}
      <Loading isOpen={loading} />

      <Flex justifyContent="center" w="100%">
        <Flex flexDir="column" w={{ base: '100%', md: '800px' }} mt={10}>
          <Heading size="lg">학습 리소스 작성</Heading>

          <Flex flexDir="column" mt={5}>
            {/* 카테고리 */}
            <FormControl zIndex={1000} mb={5}>
              <ItemAutocomplete
                placeholder="카테고리를 입력하세요"
                value={state.category}
                onChange={onChangeCategory}
              />
            </FormControl>

            {/* 제목 */}
            <InputGroup>
              <InputLeftAddon>
                <Text fontSize="sm">제목</Text>
              </InputLeftAddon>
              <Input placeholder="제목을 입력하세요" bg="#fff" value={state.name} onChange={onChangeName} />
            </InputGroup>

            {/* url */}
            <InputGroup mt={3} mb={3}>
              <InputLeftAddon>
                <Text fontSize="sm">url</Text>
              </InputLeftAddon>
              <Input
                type="url"
                placeholder="관련 링크를 입력하세요"
                bg="#fff"
                value={state.url}
                onChange={onChangeUrl}
              />
            </InputGroup>

            {/* 에디터 */}
            <div ref={editorElRef} style={{ minHeight: '400px' }}></div>
          </Flex>

          <Flex mt={8} justifyContent="flex-end" gap={3}>
            <Button colorScheme="teal" onClick={onClickSave}>
              저장
            </Button>
            <Button onClick={onClickPrev}>이전</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
