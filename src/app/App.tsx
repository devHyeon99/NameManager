import NicknameForm from '@/components/NicknameForm/NicknameForm';
import NicknameList from '@/components/NicknameList/NicknameList';
import { useNicknames } from '@/hooks/useNicknames';
import { useNicknameSearch } from '@/hooks/useNicknameSearch';
import * as S from './App.styles';

function App() {
  const {
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
  } = useNicknames();

  return (
    <S.AppContainer>
      <S.Title>닉네임 관리</S.Title>
      <NicknameForm onAdd={addNicknameHandler} />

      <S.SearchContainer>
        <S.VisuallyHiddenLabel htmlFor='search'>
          검색어 입력
        </S.VisuallyHiddenLabel>
        <S.SearchInput
          type='text'
          id='search'
          ref={inputRef}
          placeholder='닉네임 검색'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        ></S.SearchInput>
        <S.SearchButton type='button' onClick={handleSearch}>
          검색
        </S.SearchButton>
      </S.SearchContainer>

      <S.ButtonContainer>
        <S.DeleteModeButton type='button' onClick={toggleDeleteMode}>
          {isDeleteMode ? '취소' : '선택 삭제'}
        </S.DeleteModeButton>
        <S.DeleteModeButton type='button' onClick={handleDeleteAll}>
          전체 삭제
        </S.DeleteModeButton>
        <S.DeleteModeButton type='button' onClick={handleSaveDB}>
          DB 저장
        </S.DeleteModeButton>
        <S.InputFileButton as='label'>
          DB 삽입
          <input
            type='file'
            accept='application/json'
            onChange={handleLoadDB}
            hidden
          />
        </S.InputFileButton>
      </S.ButtonContainer>

      <NicknameList
        nicknames={nicknames}
        isDeleteMode={isDeleteMode}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />

      {isDeleteMode && selectedIds.size > 0 && (
        <S.FloatingDeleteButton onClick={handleDeleteSelected}>
          {selectedIds.size}개 항목 삭제하기
        </S.FloatingDeleteButton>
      )}
    </S.AppContainer>
  );
}

export default App;
