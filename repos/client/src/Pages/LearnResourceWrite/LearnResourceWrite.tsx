import { Input, Select } from '@chakra-ui/react';

export const LearnResourceWrite = () => {
  return (
    <div>
      <Input placeholder="제목을 입력하세요" />
      <Select placeholder="-- 카테고리 --">
        <option>React</option>
        <option>C#</option>
      </Select>
    </div>
  );
};
