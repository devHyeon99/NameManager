import * as S from './NicknameList.styles';
import { Nickname } from '@/types';
import NicknameItem from '@/components/NicknameItem/NicknameItem';

interface NicknameListProps {
  nicknames: Nickname[];
  isDeleteMode: boolean;
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
}

function NicknameList({
  nicknames,
  isDeleteMode,
  selectedIds,
  onToggleSelect,
}: NicknameListProps) {
  return (
    <S.ListContainer>
      {nicknames.map((nickname) => (
        <NicknameItem
          key={nickname.id}
          nickname={nickname}
          isDeleteMode={isDeleteMode}
          isSelected={selectedIds.has(nickname.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </S.ListContainer>
  );
}

export default NicknameList;
