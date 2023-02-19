import { useState } from "react";
import Pairs from "./pairs_game/Pairs";
import styled, { keyframes } from "styled-components";
import "./index.css";
import ReactionTime from "./reaction_time/ReactionTime";
import TypingTest from "./typing_test/TypingText";
function Home() {
  const [settings, setSettings] = useState({
    game: "",
    level: "",
  });

  const renderGame = () => {
    switch (settings.game) {
      case "Find Pairs":
        return <Pairs level={settings.level} />;
      case "Reaction Time Test":
        return <ReactionTime></ReactionTime>;
      case "Typing Test":
        return <TypingTest></TypingTest>;
      default:
        return;
    }
  };

  return (
    <>
      {settings.game === "" ? (
        <MainContainer>
          <MenuContainer>
            <GameOptionDiv onClick={() => setSettings({ game: "Find Pairs" })}>
              <GameOption>Find Pairs</GameOption>
            </GameOptionDiv>
            <GameOptionDiv
              onClick={() => setSettings({ game: "Reaction Time Test" })}
            >
              <GameOption>
                Reaction Time
                <br />
              </GameOption>
            </GameOptionDiv>
            <GameOptionDiv onClick={() => setSettings({ game: "Typing Test" })}>
              <GameOption>
                Typing Speed
                <br />
              </GameOption>
            </GameOptionDiv>
          </MenuContainer>
        </MainContainer>
      ) : (
        renderGame()
      )}
    </>
  );
}

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  place-content: center;
  margin: auto auto;
`;

const MenuContainer = styled.div`
  border-radius: 2vw;
  width: 70vw;
  height: 70vh;
  background-image: linear-gradient(to right, var(--board-color), #e0dfdf9d);
  display: flex;
  place-content: center;
  align-items: center;
  justify-content: space-evenly;
  margin: auto auto;
  padding: 1vw;
`;

const HeadingContainer = styled.div`
  width: 100%;
  height: 30%;
  background-color: black;
`;

const GameOptionDiv = styled.div`
  height: 50%;
  width: 30%;
  display: flex;
  margin: auto auto;
  place-content: center;
  border-radius: 10%;
  transition: 0.2s;
  :hover {
    cursor: pointer;
    color: #618dbe;
    background-color: white;
  }
`;
const GameOption = styled.h1`
  text-decoration: none;
  font-size: 2em;
  align-self: center;
`;

export default Home;
