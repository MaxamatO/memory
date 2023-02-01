import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Card from "./Card";
import populate from "./Redu";
import styled from "styled-components";

function Board() {
    const [cards, setCards] = useState(populate())

    const [openCards, setOpenCards] = useState([])

    const [guessedCards, setGuessedCards] = useState([])

    const timeoutRef = useRef(null)

    useEffect(() => {
        const checkWin = () => {
            const [firstCard, secondCard] = openCards
            if (cards[firstCard] === cards[secondCard]) {
                setGuessedCards((previous) => [...previous, firstCard, secondCard])
                setOpenCards([])
                return
            }

            timeoutRef.current = setTimeout(() => {
                setOpenCards([])
            }, 1000)
        }

        if (openCards.length === 2) {
            checkWin()
        }
    }, [openCards, cards])


    const handleClick = (index) => {
        if (openCards.length === 1) {
            if (openCards[0] === index) return
            setOpenCards([...openCards, index])
        } else {
            clearTimeout(timeoutRef.current)
            setOpenCards([index])
        }
    }

    const isOpen = (index) => {
        return openCards.includes(index)
    }

    const isGuessed = (index) => {
        return guessedCards.includes(index)
    }


    return (
        <Container>
            {guessedCards.length === cards.length && (<Header>Congratulations, you have won!</Header>)}
            <CardWrapper>
                {cards.map((cardValue, index) => {
                    return (
                        <Card
                            key={index}
                            clickHandler={() => handleClick(index)}
                            open={isOpen(index)}
                            guessed={isGuessed(index)}
                            value={cardValue} />
                    )
                })}
            </CardWrapper>
        </Container>
    )

}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`

const CardWrapper = styled.div`
    width: 50%;
    height: 85%;
    margin: auto auto;
    background-color: var(--board-color);
    display: grid;
    grid-template-columns: repeat(5, 15%);
    grid-template-rows: repeat(4, 20%);
    column-gap: 5%;
    row-gap: 5%;
    place-content: center;  
`

const Header = styled.h1`
    text-align: center;
`

export default Board;