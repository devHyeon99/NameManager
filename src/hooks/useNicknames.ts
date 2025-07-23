import { useState, useEffect, useCallback, useRef } from 'react';
import { Nickname, FormValues } from '@/types';
import {
  getAllNicknames,
  addNickname,
  deleteNicknames,
  deleteAllNicknames,
  exportDBToJsonFile,
  importJsonToDB,
} from '@/utils/db';

export function useNicknames() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nicknames, setNicknames] = useState<Nickname[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 데이터 로딩
  const loadNicknames = useCallback(async () => {
    const data = await getAllNicknames();
    setNicknames(data);
  }, []);

  useEffect(() => {
    loadNicknames();
  }, [loadNicknames]);

  const addNicknameHandler = async (nicknameData: FormValues) => {
    const newNickname: Nickname = {
      id: Date.now(),
      name: nicknameData.name,
      date: nicknameData.date,
      otherName: nicknameData.otherName || '', // undefined일 경우 빈 문자열을 할당
      union: nicknameData.union || 0, // undefined일 경우 0을 할당
      badge: nicknameData.badge || 0, // undefined일 경우 0을 할당
    };

    await addNickname(newNickname);
    await loadNicknames(); // 추가 후 목록을 다시 불러옵니다.
  };

  // 삭제 모드 토글
  const toggleDeleteMode = () => {
    if (nicknames.length === 0) return;
    setIsDeleteMode((prev) => !prev);
    setSelectedIds(new Set()); // 모드 변경 시 선택 초기화
  };

  // 개별 아이템 선택/해제
  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const newSelectedIds = new Set(prev);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  // 선택된 아이템 삭제
  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    await deleteNicknames(Array.from(selectedIds));
    setIsDeleteMode(false);
    setSelectedIds(new Set());
    await loadNicknames();
  };

  // 전체 아이템 삭제
  const handleDeleteAll = async () => {
    if (nicknames.length === 0) return;

    const confirmed = window.confirm(
      '정말 모든 닉네임을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (!confirmed) return;

    await deleteAllNicknames();
    await loadNicknames();
  };

  // DB 저장
  const handleSaveDB = async () => {
    if (nicknames.length === 0) return;

    await exportDBToJsonFile();

    alert('DB 저장 완료');
  };

  // DB 불러오기
  const handleLoadDB = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      '이 파일을 DB에 불러오시겠습니까? 기존 데이터와 병합됩니다.'
    );
    if (confirmed) {
      await importJsonToDB(file);
      await loadNicknames(); // DB 다시 로드
    }
  };

  // 닉네임 검색
  const handleSearch = async () => {
    const query = inputRef.current?.value.trim() || '';
    const allNicknames = await getAllNicknames();

    const filtered = allNicknames.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setNicknames(filtered);
  };

  return {
    nicknames,
    isDeleteMode,
    selectedIds,
    inputRef,
    addNicknameHandler,
    toggleDeleteMode,
    handleToggleSelect,
    handleDeleteSelected,
    handleDeleteAll,
    handleSaveDB,
    handleLoadDB,
    handleSearch,
  };
}
