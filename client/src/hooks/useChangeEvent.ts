import { useState, useCallback, Dispatch, SetStateAction } from 'react';

const useChangeEvent = <T extends { value: string } = HTMLInputElement>(
  initValue: string,
): [string, Dispatch<SetStateAction<string>>, (e: React.ChangeEvent<T>) => void] => {
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChangeValue];
};

export default useChangeEvent;
