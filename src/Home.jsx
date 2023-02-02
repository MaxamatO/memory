import { useState } from "react";
import Pairs from "./pairs_game/Pairs";
import styled from "styled-components";
import "./index.css";
import ReactionTime from "./reaction_time/ReactionTime";
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
      default:
        return;
    }
  };

  return (
    <>
      {settings.game === "" ? (
        <MenuContainer>
          <GameOption onClick={() => setSettings({ game: "Find Pairs" })}>
            Find Pairs
          </GameOption>
          <GameOption
            onClick={() => setSettings({ game: "Reaction Time Test" })}
          >
            Reaction Time Test <br />
          </GameOption>
        </MenuContainer>
      ) : (
        renderGame()
      )}
    </>
  );
}

const MenuContainer = styled.div`
  width: 100vw;
  height: 20vh;
  background-color: var(--board-color);
  display: flex;
  place-content: center;
  align-items: center;
  justify-content: space-evenly;
  margin: auto auto;
`;

const GameOption = styled.a`
  text-decoration: none;
  font-size: 2.2em;
  :hover {
    cursor: pointer;
    color: var(--bg-color);
  }
`;

const ComingSoon = styled.h1`
  font-size: 3rem;
`;

export default Home;
