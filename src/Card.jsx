import React from "react"
import styled from "styled-components";

function Card({ clickHandler, value, open, guessed }) {
    return (
        <>
            {guessed ?
                <GuessedCard>{value}</GuessedCard>
                : <MemoryCard onClick={clickHandler}>{open ? value : ''}</MemoryCard>
            }
        </>
    )
}

const MemoryCard = styled.button`
    background-color: #A99985;
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;

    :hover{
        background-color: #999999;
        cursor: pointer;
    }
`

const GuessedCard = styled(MemoryCard)`
    background-color: #70798C;
`

export default Card;