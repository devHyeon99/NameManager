import { useRef, useState } from 'react';
import { Nickname } from '@/types';
import { getAllNicknames } from '@/utils/db';

export function useNicknameSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Nickname[]>([]);

  const handleSearch = async () => {
    const query = inputRef.current?.value.trim() || '';
    const allNicknames = await getAllNicknames();

    const filtered = allNicknames.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  const resetSearch = async () => {
    if (inputRef.current) inputRef.current.value = '';
    const allNicknames = await getAllNicknames();
    setResults(allNicknames);
  };

  return {
    inputRef,
    results,
    handleSearch,
    resetSearch,
  };
}
