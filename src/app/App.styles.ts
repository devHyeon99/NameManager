import styled from '@emotion/styled';

export const AppContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.large};
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

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

export const SearchInput = styled.input`
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const SearchButton = styled.button`
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.medium}`};
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
`;

export const DeleteModeButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  :hover {
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const InputFileButton = styled.label`
  display: inline-block;
  background: none;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  text-align: center;

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.colors.primary};
  }

  input {
    display: none;
  }
`;

export const FloatingDeleteButton = styled.button`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.colors.special};
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;
