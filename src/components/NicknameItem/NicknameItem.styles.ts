import styled from '@emotion/styled';

interface ItemProps {
  isAnniversary: boolean;
}

export const ItemContainer = styled.div<ItemProps>`
  display: flex;
  justify-content: space-between;
  min-height: 84px;
  max-height: 84px;
  padding: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius};
  border-left: 5px solid
    ${(props) =>
      props.isAnniversary
        ? props.theme.colors.special
        : props.theme.colors.primary};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CheckboxInput = styled.input`
  /* 기본 체크박스 스타일 숨기기 */
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  margin-right: ${(props) => props.theme.spacing.medium};
  position: relative;
  transition: background-color 0.2s;

  /* 체크되었을 때 스타일 */
  &:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  /* 체크 표시(V) 만들기 */
  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid ${(props) => props.theme.colors.secondary};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Name = styled.span`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
`;

export const SubInfo = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.medium};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.small};
  text-align: right;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const AnniversaryText = styled.span`
  color: ${(props) => props.theme.colors.special};
  font-weight: bold;
`;
