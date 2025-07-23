import { Nickname } from '@/types';
import { getDaysAgo, isOneYearAnniversary } from '@/utils/date';
import * as S from './NicknameItem.styles';

interface NicknameItemProps {
  nickname: Nickname;
  isDeleteMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

function NicknameItem({
  nickname,
  isDeleteMode,
  isSelected,
  onToggleSelect,
}: NicknameItemProps) {
  const daysAgo = getDaysAgo(nickname.date);
  const anniversary = isOneYearAnniversary(nickname.date);

  return (
    <S.ItemContainer isAnniversary={anniversary}>
      <S.InputContainer>
        {isDeleteMode && (
          <S.CheckboxInput
            type='checkbox'
            checked={isSelected}
            onChange={() => onToggleSelect(nickname.id)}
          />
        )}
        <S.InfoContainer>
          <S.Name>{nickname.name}</S.Name>
          <S.SubInfo>
            {/* 값이 있을 때만 표시하도록 조건부 렌더링 */}
            {nickname.otherName && <span>본캐: {nickname.otherName}</span>}
            {nickname.union > 0 && <span>유니온: {nickname.union}</span>}
            {nickname.badge > 0 && <span>업적: {nickname.badge}</span>}
          </S.SubInfo>
        </S.InfoContainer>
      </S.InputContainer>
      <S.DateInfo>
        <div>{nickname.date}</div>
        <div>
          {anniversary ? (
            <S.AnniversaryText>오후 3시 대기</S.AnniversaryText>
          ) : (
            `${daysAgo}일 전`
          )}
        </div>
      </S.DateInfo>
    </S.ItemContainer>
  );
}

export default NicknameItem;
