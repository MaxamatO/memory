import React from "react";
import styled from "styled-components";

const Board = (props) => {
  return (
    <MainContent onClick={() => props.clickHandler()} $start={props.$start}>
      {props.renderColor()}
    </MainContent>
  );
};

const MainContent = styled.div`
  width: 60vw;
  height: 60vh;
  margin: auto auto;
  display: flex;
  background-color: ${(props) => props.$start};
  :hover {
    cursor: pointer;
  }
`;
export default Board;
