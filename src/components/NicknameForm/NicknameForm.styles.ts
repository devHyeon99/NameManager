import styled from '@emotion/styled';

export const FormContainer = styled.form`
  display: flex;
  flex-flow: row wrap; /* 너비가 부족하면 줄 바꿈 허용 */
  gap: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.large};
  padding: ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const SubmitButton = styled.button`
  flex-basis: 100%; /* 버튼은 항상 한 줄을 다 차지하도록 설정 */
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.medium}`};
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  cursor: pointer;
  margin-top: ${(props) => props.theme.spacing.small};
`;
