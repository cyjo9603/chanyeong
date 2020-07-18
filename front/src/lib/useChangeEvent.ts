import { useState, useCallback, Dispatch, SetStateAction } from 'react';

export default <T extends { value: string }>(
  initValue: string,
): [string, Dispatch<SetStateAction<string>>, (e: React.ChangeEvent<T>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChangeValue];
};
