import { Input, List, ListItem } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Fuse from 'fuse.js';
import { ROADMAP_ITEM_NAME_LIST } from '../../Constants/roadmap';
import './AutocompleteTest.css';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';

interface FuseResult {
  id: number;
  name: string;
}

const autocompleteItems = ROADMAP_ITEM_NAME_LIST.map(({ name }, i) => ({ id: i, name }));

export const AutocompleteTest = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fuseResult, setFuseResult] = useState<FuseResult[]>([]);

  useEffect(() => {
    console.log(searchKeyword);

    const fuse = new Fuse(autocompleteItems, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: ['name'],
    });
    fuse.setCollection(autocompleteItems);

    const newFuseResult = fuse
      .search(searchKeyword, { limit: 5 })
      .map((result) => ({ ...result.item }))
      .slice(0, 5);

    setFuseResult(newFuseResult);

    console.log(newFuseResult);
  }, [searchKeyword]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div style={{ padding: '50px', width: '500px' }}>
      <h1>autocomplete 테스트입니다</h1>
      <div style={{ padding: '10px' }}></div>

      <ReactSearchAutocomplete
        placeholder="항목명을 입력하세요"
        items={autocompleteItems}
        //   inputSearchString={state.name}
        //   onSearch={handleOnSearch}
        //   onSelect={handleOnSelect}
        maxResults={5}
        showNoResults={false}
        inputDebounce={10}
      />
      <div style={{ padding: '10px' }}></div>

      <Input placeholder="항목명을 입력하세요" value={searchKeyword} onChange={onChangeName} />
      <List>
        {fuseResult.map(({ id, name }) => (
          <ListItem key={id}>{name}</ListItem>
        ))}
      </List>

      <div style={{ padding: '10px' }}></div>
      <div className="autocomplete-container">
        <div className="wrapper">
          <div className="input-container">
            <SearchIcon ml="16px" boxSize={3.5} color="gray.500" />
            <input type="text" placeholder="항목명을 입력하세요" spellCheck={false}></input>
            <CloseIcon mr="16px" boxSize={3} color="gray.500" cursor="pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
