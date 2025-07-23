import styled from '@emotion/styled';

// 스크린 리더는 읽을 수 있지만 화면에는 보이지 않는 Label
export const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const FieldWrapper = styled.div`
  flex: 1 1 80px; /* flex-grow, flex-shrink, flex-basis */
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  margin-top: 0.5rem;
  color: red;
`;

export const Input = styled.input`
  width: 100%; /* 부모 요소 너비에 맞춤 */
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.medium};
  box-sizing: border-box; /* padding과 border가 너비에 포함되도록 설정 */
`;
