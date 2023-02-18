import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { ROADMAP_ITEM_NAME_LIST } from '../../../Constants/roadmap';
import './ItemAutocomplete.css';

const autocompleteItems = ROADMAP_ITEM_NAME_LIST.map(({ name }, i) => ({ id: i, name }));
const fuse = new Fuse(autocompleteItems, {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['name'],
});
fuse.setCollection(autocompleteItems);

interface FuseResult {
  id: number;
  name: string;
  selected?: boolean;
}

interface ItemAutocompleteProps {
  value: string;
  placeholder?: string;
  onChange(value: string): void;
}

export const ItemAutocomplete = ({ value, placeholder, onChange }: ItemAutocompleteProps) => {
  const [fuseResult, setFuseResult] = useState<FuseResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchResult = useCallback(
    _.debounce((keyword: string) => {
      const newFuseResult = fuse.search(keyword, { limit: 5 }).map((result) => ({ ...result.item }));
      setFuseResult(newFuseResult);
    }, 100),
    [],
  );

  // 결과 검색
  useEffect(() => {
    searchResult(value);
  }, [searchResult, value]);

  // 바깥 클릭시 결과 닫기
  useEffect(() => {
    const onClick = () => {
      setShowResult(false);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const onClickClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const onKeyDownInput = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter': {
          const selectedResult = fuseResult.find(({ selected }) => selected);
          if (selectedResult) {
            onChange(selectedResult.name);
          }
          setShowResult(false);
          inputRef.current?.blur();
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          if (!fuseResult.length) {
            return;
          }
          const currentIndex = fuseResult.findIndex(({ selected }) => selected);
          if (currentIndex === fuseResult.length - 1) {
            return;
          }

          const selectIndex = currentIndex > -1 ? currentIndex + 1 : 0;
          const newFuseResult = [...fuseResult.map((result) => ({ ...result, selected: false }))];
          newFuseResult[selectIndex].selected = true;
          setFuseResult(newFuseResult);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!fuseResult.length) {
            return;
          }
          const currentIndex = fuseResult.findIndex(({ selected }) => selected);
          if (currentIndex === 0) {
            return;
          }

          const selectIndex = currentIndex > -1 ? currentIndex - 1 : 0;
          const newFuseResult = [...fuseResult.map((result) => ({ ...result, selected: false }))];
          newFuseResult[selectIndex].selected = true;
          setFuseResult(newFuseResult);
          break;
        }
        default:
          setShowResult(true);
          break;
      }
    },
    [fuseResult, onChange],
  );

  const onClickItem = (name: string) => {
    setShowResult(false);
    onChange(name);
    console.log(name);
  };

  return (
    <div className="autocomplete-container">
      <div className="wrapper">
        {/* 입력 */}
        <div className="input-container">
          <SearchIcon ml="16px" boxSize={3.5} color="gray.500" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            spellCheck={false}
            value={value}
            onChange={onChangeName}
            onKeyDown={onKeyDownInput}
          ></input>
          {value && <CloseIcon mr="16px" boxSize={3} color="gray.500" cursor="pointer" onClick={onClickClear} />}
        </div>

        {/* 결과 */}
        {fuseResult.length > 0 && showResult && (
          <div className="result-container">
            <div className="line"></div>
            <ul>
              {fuseResult.map(({ id, name, selected }) => (
                <li key={id} className={selected ? 'selected' : ''} onClick={() => onClickItem(name)}>
                  <SearchIcon ml="16px" boxSize={3.5} color="gray.500" />
                  <div className="name">{name}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
