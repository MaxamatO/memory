import React, { createRef, useEffect, useRef, useState } from "react"
import styled from "styled-components";

function Card(props) {

    return(
        <>
            
                
            <MemoryCard onClick={() => console.log(props.id)} >
                    <p className="hidden"></p>
            </MemoryCard>
                    
                
            
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
    .hidden{
        opacity: 0;
    }
    .show{
        opacity: 100;
    }
    p{
        font-size: 30px;
        margin-top: 50%;
    }
    .disabled{
        
        background-color: #70798C;
        
    }
`

export default Card;