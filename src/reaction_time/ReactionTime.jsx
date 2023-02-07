import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import populate from "../helper_functions/Redu.js";
import Home from "../Home.jsx";

const RED = "#d47c7c";
const GREEN = "#9ccc74";
const YELLOW = "#c2c46e";

function ReactionTime() {
  const [backgroundClicker, setBackgroundClicker] = useState(YELLOW);

  const timeToChangeColorRef = useRef();

  const reactionTime = useRef([0, 0]);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  useEffect(() => {
    if (backgroundClicker === RED) {
      timeToChangeColorRef.current = setTimeout(() => {
        changeColor();
      }, populate("RT") * 1000);
    }
    // eslint-disable-next-line
  }, [backgroundClicker]);

  const changeColor = () => {
    if (backgroundClicker === RED) {
      reactionTime.current[0] = Date.now();
      setBackgroundClicker(GREEN);
    } else if (backgroundClicker === YELLOW) {
      setBackgroundClicker(RED);
    } else {
      reactionTime.current[1] = Date.now();
      console.log(reactionTime.current[1] - reactionTime.current[0]);
      setBackgroundClicker(YELLOW);
    }
    clearTimeout(timeToChangeColorRef.current);
  };

  const renderColor = () => {
    if (backgroundClicker === RED) {
      return <Alert>Wait</Alert>;
    } else if (backgroundClicker === GREEN) {
      return <Alert>Click</Alert>;
    }
    return (
      <Alert>
        Click to start <br />{" "}
        {reactionTime.current[1] === reactionTime.current[0]
          ? ""
          : (reactionTime.current[1] - reactionTime.current[0]) / 1000 + "s"}
      </Alert>
    );
  };

  const handleClick = () => {
    if (backgroundClicker === RED) return;
    changeColor();
  };

  return (
    <>
      {isMenuClicked === true ? (
        <Home></Home>
      ) : (
        <Container>
          <MenuBackButton onClick={() => setIsMenuClicked(true)}>
            menu
          </MenuBackButton>
          <MainContent $start={backgroundClicker} onClick={() => handleClick()}>
            {renderColor()}
          </MainContent>
        </Container>
      )}
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
  background-color: ${(props) => props.$start};
  :hover {
    cursor: pointer;
  }
`;

const Alert = styled.h1`
  font-size: 3vw;
  margin: auto auto;
  user-select: none;
`;

const MenuBackButton = styled.button`
  font-size: 2.5vw;
  width: fit-content;
  height: fit-content;
  margin-top: 1%;
  padding: 1%;
  border-radius: 10em;
  margin-right: 2%;
  margin-left: 2%;
  position: absolute;
  :hover {
    cursor: pointer;
    background-color: #b1aeae9e;
  }
`;
export default ReactionTime;
