import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import populate from "../helper_functions/Redu";
import "../index.css";
import Text from "./Text";
import Home from "../Home";

const BASIC = "black";

const TypingTest = () => {
  const [textToType, setTextToType] = useState(populate("TT"));
  const [textInView, setTextInView] = useState();
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const currentWordRef = useRef();

  const timeToFinish = useRef(null);

  useEffect(() => {
    if (textToType.length === 0) return;
    setTextInView(textToType[0]);
    currentWordRef.current.value = "";
    // eslint-disable-next-line
  }, [textToType]);

  const checkWord = () => {
    let slicedTextToType = textToType.slice();
    let wordToCompare = slicedTextToType[0];
    if (wordToCompare === currentWordRef.current.value.trim()) {
      slicedTextToType.shift();
      setTextToType(slicedTextToType);
    }
  };

  const restart = () => {
    setTextToType(populate("TT").split(" "));
    setTextInView(textToType.slice()[0]);
    return;
  };

  return (
    <>
      {isMenuClicked ? (
        <Home></Home>
      ) : (
        <>
          <MenuBackButton onClick={() => setIsMenuClicked(true)}>
            menu
          </MenuBackButton>
          <Container>
            <Content>
              {textToType.length === 0 ? (
                <GameOver>
                  <Information>
                    Good job! Press the button to play again
                  </Information>
                  <PressMe onClick={() => restart()}>play again</PressMe>
                </GameOver>
              ) : (
                <>
                  <TextContainer>
                    <Text word={textInView} color={BASIC} />
                  </TextContainer>
                  <InputContainer
                    ref={currentWordRef}
                    onChange={() => checkWord()}
                  ></InputContainer>
                </>
              )}
            </Content>
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
  display: flex;
`;

const Content = styled.div`
  height: 50vh;
  width: 50vw;
  margin: auto auto;
  place-content: center;
  background-color: var(--board-color);
  padding: 2em;
`;

const InputContainer = styled.input`
  border: black 1px solid;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  background-color: var(--board-color);
  text-align: center;
  font-size: 2vw;
`;

const TextContainer = styled.div`
  border: black 1px solid;
  display: flex;
  width: 100%;
  height: 70%;
  margin-bottom: 5vh;
  word-wrap: break-word;
  font-size: 4vw;
  text-align: center;
  justify-content: center;
  line-height: 25vh;
`;

const GameOver = styled.div`
  display: flex;
  height: 100%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const PressMe = styled.button`
  font-size: 2vw;
  width: fit-content;
  height: 4vw;
  border-radius: 10vw;
  align-self: center;

  :hover {
    cursor: pointer;
    background-color: #b1aeae9e;
  }
`;

const Information = styled.h1`
  font-size: 3vw;
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

export default TypingTest;
