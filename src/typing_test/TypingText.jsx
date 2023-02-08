import React, { useRef, useState } from "react";
import styled from "styled-components";
import populate from "../helper_functions/Redu";
import "../index.css";

const TypingTest = () => {
  const [textToType, setTextToType] = useState(populate("TT"));

  const currentWordRef = useRef();

  const checkWord = () => {
    let slicedTextToType = textToType.split(" ");
    console.log(slicedTextToType);
    console.log(currentWordRef.current);
  };

  return (
    <>
      <Container>
        <Content>
          <TextContainer>{textToType}</TextContainer>
          <InputContainer
            ref={currentWordRef}
            onChange={() => checkWord()}
          ></InputContainer>
        </Content>
      </Container>
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

const TextContainer = styled.div`
  border: black 1px solid;
  width: 100%;
  height: 70%;
  margin-bottom: 5vh;
  word-wrap: break-word;
  font-size: 2vw;
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

export default TypingTest;
