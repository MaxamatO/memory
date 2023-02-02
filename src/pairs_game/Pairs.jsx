import React from "react";
import "../index.css";
import Card from "./Card";
import Home from "../Home";
import { useState } from "react";
import populate from "../Redu.js";
import { useEffect } from "react";
import styled from "styled-components";
import { useRef } from "react";

function Pairs() {
  const [cards, setCards] = useState(populate());
  const [openCards, setOpenCards] = useState([]);

  const [guessedCards, setGuessedCards] = useState([]);
  const timeoutRef = useRef(null);

  const endGameRef = useRef(false);

  useEffect(() => {
    const checkWin = () => {
      const [first, second] = openCards;
      if (cards[first] === cards[second]) {
        setGuessedCards((previous) => [...previous, first, second]);
        setOpenCards([]);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setOpenCards([]);
      }, 600);
    };

    if (openCards.length === 2) {
      checkWin();
    }
  }, [cards, openCards]);

  const isOpen = (index) => {
    return openCards.includes(index);
  };

  const handleClick = (index) => {
    if (openCards.length === 1) {
      if (openCards[0] === index) return;
      setOpenCards([...openCards, index]);
    } else {
      setOpenCards([index]);
      clearTimeout(timeoutRef.current);
    }
  };

  const isGuessed = (index) => {
    return guessedCards.includes(index);
  };

  const restartGame = (isRestart) => {
    endGameRef.current = !isRestart;
    setCards(populate);
    setGuessedCards([]);
    setOpenCards([]);
  };

  return (
    <>
      {endGameRef.current === true ? (
        <Home></Home>
      ) : (
        <Container>
          <MenuBackButton onClick={() => restartGame(false)}>
            menu
          </MenuBackButton>

          {guessedCards.length === cards.length ? (
            <WinContainer>
              <WinHeader>
                You have won! <br />
                Do you want to play again? <br />
              </WinHeader>
              <PlayAgain>
                <PlayAgainButton onClick={() => restartGame(true)}>
                  Yes
                </PlayAgainButton>
                <PlayAgainButton onClick={() => restartGame(false)}>
                  No
                </PlayAgainButton>
              </PlayAgain>
            </WinContainer>
          ) : (
            ""
          )}
          <CardWrapper>
            {cards.map((value, index) => {
              return (
                <Card
                  key={index}
                  value={value}
                  open={isOpen(index)}
                  clickHandler={() => handleClick(index)}
                  guessed={isGuessed(index)}
                />
              );
            })}
          </CardWrapper>
        </Container>
      )}
    </>
  );
}

const CardWrapper = styled.div`
  height: 85%;
  width: 50%;
  margin: auto auto;
  place-content: center;
  column-gap: 5%;
  row-gap: 5%;
  display: grid;
  grid-template-columns: repeat(5, 15%);
  grid-template-rows: repeat(4, 20%);
  background-color: var(--board-color);
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const WinHeader = styled.h1`
  font-size: 3.2vw;
  text-align: center;
  height: 45%;
`;

const WinContainer = styled.div`
  width: 100%;
`;

const PlayAgain = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  place-content: center;
`;

const PlayAgainButton = styled.button`
  font-size: 1.3vw;
  width: 10%;
  height: 5%;
  border-radius: 10em;
  margin-right: 2%;
  margin-left: 2%;
  :hover {
    cursor: pointer;
    background-color: #b1aeae9e;
  }
`;

const MenuBackButton = styled(PlayAgainButton)`
  font-size: 2.5vw;
  width: fit-content;
  height: fit-content;
  margin-top: 1%;
  padding: 1%;
`;
export default Pairs;
