import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import populate from "../helper_functions/Redu";
import "../index.css";
import Text from "./Text";
import Home from "../Home";

const BASIC = "black";
const LETTERS = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "Backspace",
];

const TypingTest = () => {
  const [textToType, setTextToType] = useState(populate("TT"));
  const [textInView, setTextInView] = useState();
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const currentWordRef = useRef();

  const [timeToFinish, setTimeToFinish] = useState(15);
  const timer = useRef(null);
  const correctWords = useRef(0);

  useEffect(() => {
    if (textToType.length === 0) {
      setIsGameOver(true);
      return;
    }
    if (timeToFinish === 0) {
      setIsGameOver(true);
      return;
    }

    timer.current = setTimeout(changeTime, 1000);
    clearTimeout(timer);

    setTextInView(textToType[0]);

    // eslint-disable-next-line
  }, [textToType, timeToFinish, isGameOver]);

  function changeTime() {
    setTimeToFinish(timeToFinish - 1);
  }

  const checkWord = () => {
    let slicedTextToType = textToType.slice();
    let wordToCompare = slicedTextToType[0];
    if (wordToCompare === currentWordRef.current.value.trim()) {
      slicedTextToType.shift();
      setTextToType(slicedTextToType);
      correctWords.current = correctWords.current + 1;
      currentWordRef.current.value = "";
    }
  };

  const restart = () => {
    setTextToType(populate("TT"));
    setTextInView(textToType.slice()[0]);
    setTimeToFinish(15);
    setIsGameOver(false);
    correctWords.current = 0;
    clearTimeout(timer);
    return;
  };

  const handleKeyDown = (event) => {
    if (!LETTERS.includes(event.key)) return;
    checkWord();
  };

  const menuClicked = () => {
    clearTimeout(timer);
    setIsMenuClicked(true);
  };

  return (
    <>
      {isMenuClicked ? (
        <Home></Home>
      ) : (
        <>
          <MenuBackButton onClick={() => menuClicked()}>menu</MenuBackButton>
          <Container>
            <Content>
              {isGameOver === true ? (
                <GameOver>
                  <Information>
                    {" "}
                    You got {correctWords.current * 4} WPM <br />
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
                    onKeyUp={(event) => handleKeyDown(event)}
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
