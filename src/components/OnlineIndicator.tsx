import styled from "styled-components";

type Props = {
  isOnline: boolean;
};

export const OnlineIndicator = styled.div<Props>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ isOnline }) => (isOnline ? "green" : "red")};
`;
