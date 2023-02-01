import React from "react";
import styled from "styled-components";

function Card(props) {
  return (
    <>
      {props.guessed ? (
        <GuessedCard>{props.value}</GuessedCard>
      ) : (
        <MemoryCard onClick={props.clickHandler}>
          {props.open ? props.value : ""}
        </MemoryCard>
      )}
    </>
  );
}

const MemoryCard = styled.button`
  background-color: #a99985;
  text-align: center;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 30px;

  :hover {
    background-color: #999999;
    cursor: pointer;
  }
`;

const GuessedCard = styled(MemoryCard)`
  background-color: #919191;
`;

export default Card;
