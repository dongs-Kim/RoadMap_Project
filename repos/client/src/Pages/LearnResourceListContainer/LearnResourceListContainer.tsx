import { useCallback, useState } from 'react';
import { LearnResourceList, LearnResourceListProps } from '../LearnResourceList/LearnResourceList';
import { LearnResourceWrite } from '../LearnResourceWrite/LearnResourceWrite';

export const LearnResourceListContainer = (props: LearnResourceListProps) => {
  const [isWriteLearnResource, setWriteLearnResource] = useState(false);

  const writeLearnResource = useCallback(() => {
    setWriteLearnResource(true);
  }, []);

  const goList = useCallback(() => {
    setWriteLearnResource(false);
  }, []);

  if (isWriteLearnResource) {
    return <LearnResourceWrite goList={goList} />;
  }
  return <LearnResourceList {...props} writeLearnResource={writeLearnResource} />;
};
