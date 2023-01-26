import { ChangeEvent, useState } from 'react';
import { Flow } from './Flow';

const RoadmapWrite = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('back_end');
  const [isPublic, setIsPublic] = useState(true);
  const [contents, setContents] = useState('');

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const onChangeIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.checked);
  };
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  return (
    <div>
      <h1>로드맵 작성</h1>
      <div>
        <label>제목</label>
        <input type="text" value={title} onChange={onChangeTitle}></input>
      </div>
      <div>
        <label>카테고리</label>
        <select value={category} onChange={onChangeCategory}>
          <option value="front_end">프론트엔드</option>
          <option value="back_end">백엔드</option>
        </select>
      </div>
      <div>
        <label>공개여부</label>
        <input type="checkbox" checked={isPublic} onChange={onChangeIsPublic}></input>
      </div>
      <div>
        <label>설명</label>
        <textarea value={contents} onChange={onChangeContents} />
      </div>
      <div>
        <label>로드맵</label>
        <div style={{ height: 800 }}>
          <Flow />
        </div>
      </div>
    </div>
  );
};

export default RoadmapWrite;
