import { ChangeEvent, useCallback, useEffect, useReducer, useRef } from 'react';
import { Button, Input, Select } from '@chakra-ui/react';
import Editor from '@toast-ui/editor';
import { LearnResourceCreateDto } from '../../Interface/learnResource';
import { createLearnResourceAsync } from '../../Apis/learnResourceApi';

//---------------------
// state
//---------------------
type State = LearnResourceCreateDto;
const initialState: State = {
  name: '',
  category: '',
  contents: '',
  url: '',
};
type SetNameAction = { type: 'setName'; name: string };
type SetCategoryAction = { type: 'setCategory'; category: string };
type SetContentsAction = { type: 'setContents'; contents: string };
type SeUrlAction = { type: 'setUrl'; url: string };

type Action = SetNameAction | SetCategoryAction | SetContentsAction | SeUrlAction;
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setCategory':
      return { ...state, category: action.category };
    case 'setContents':
      return { ...state, contents: action.contents };
    case 'setUrl':
      return { ...state, url: action.url };
    default:
      throw new Error();
  }
}

export const LearnResourceWrite = () => {
  const editorElRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

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
      setTimeout(() => {
        editor.setMarkdown(state.contents ?? '');
      });
    }
  }, [state.contents]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setName', name: e.target.value });
  }, []);

  const onChangeCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'setCategory', category: e.target.value });
  }, []);

  const onChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setUrl', url: e.target.value });
  }, []);

  const onClickSave = useCallback(async () => {
    if (!editorRef.current) {
      return;
    }
    const saveDto: LearnResourceCreateDto = {
      name: state.name,
      category: state.category,
      contents: editorRef.current.getMarkdown(),
      url: state.url,
    };

    await createLearnResourceAsync(saveDto);
  }, [state]);

  return (
    <div>
      <Input placeholder="제목을 입력하세요" value={state.name} onChange={onChangeName} />
      <Select placeholder="-- 카테고리 --" value={state.category} onChange={onChangeCategory}>
        <option>React</option>
        <option>C#</option>
      </Select>
      <Input type="url" placeholder="링크를 입력하세요" value={state.url} onChange={onChangeUrl} />
      <div ref={editorElRef} style={{ minHeight: '400px' }}></div>
      <Button onClick={onClickSave}>저장</Button>
    </div>
  );
};
