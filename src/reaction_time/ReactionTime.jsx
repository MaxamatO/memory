import React from "react";
import { useState } from "react";
import styled from "styled-components";

const RED = "#d47c7c";
const GREEN = "#9ccc74";

function ReactionTime() {
  const [backgroundClicker, setBackgroundClicker] = useState(RED);

  // const timeToChangeColorRef = userRef();

  const changeColor = () => {
    backgroundClicker === RED
      ? setBackgroundClicker(GREEN)
      : setBackgroundClicker(RED);
  };

  return (
    <>
      <Container>
        <MainContent
          $start={backgroundClicker === RED ? false : true}
          onClick={() => changeColor()}
        >
          {backgroundClicker === RED ? (
            <Alert>Wait</Alert>
          ) : (
            <Alert>Click</Alert>
          )}
        </MainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MainContent = styled.div`
  width: 60vw;
  height: 60vh;
  margin: auto auto;
  display: flex;
  background-color: ${(props) => (props.$start === false ? RED : GREEN)};
  :hover {
    cursor: pointer;
  }
`;

const Alert = styled.h1`
  font-size: 3vw;
  margin: auto auto;
  user-select: none;
`;

export default ReactionTime;
